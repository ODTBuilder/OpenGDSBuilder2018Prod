/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import java.io.StringReader;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.GeogigCommandException;
import com.gitrnd.gdsbuilder.geogig.command.object.CatObject;
import com.gitrnd.gdsbuilder.geogig.command.repository.LsTreeRepository;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCat;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCat.Attribute;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCat.Commit;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCat.Feature;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCat.FeatureType;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCat.Subtree;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureAttribute;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRevisionTree;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRevisionTree.Node;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
@Service("objectService")
public class GeogigObjectServiceImpl implements GeogigObjectService {

	@Override
	public GeogigCat catObject(DTGeoserverManager geoserverManager, String repoName, String objectid)
			throws JAXBException {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		CatObject catObj = new CatObject();
		GeogigCat cat = null;
		try {
			cat = catObj.executeCommand(url, user, pw, repoName, objectid);
		} catch (GeogigCommandException e) {
			if (e.isXml()) {
				JAXBContext jaxbContext = JAXBContext.newInstance(GeogigCat.class);
				Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
				cat = (GeogigCat) unmarshaller.unmarshal(new StringReader(e.getResponseBodyAsString()));
			} else {
				cat = new GeogigCat();
				cat.setError(e.getMessage());
				cat.setSuccess("false");
			}
		}
		return cat;
	}

	@Override
	public GeogigFeatureAttribute catConflictFeatureObject(DTGeoserverManager geoserverManager, String repoName,
			String path, String commitId, String featureId) throws JAXBException {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		String[] ids = path.split("/");
		String layerName = ids[0];
		String featureName = ids[1];
		GeogigFeatureAttribute featureAtt = null;
		try {
			CatObject catObj = new CatObject();
			List<Attribute> attrTypes = null;
			GeogigCat catOurs = catObj.executeCommand(url, user, pw, repoName, commitId);
			Commit commit = catOurs.getCommit();
			if (commit != null) {
				String treeId = catOurs.getCommit().getTree();
				GeogigCat catTree = catObj.executeCommand(url, user, pw, repoName, treeId);
				List<Subtree> subTrees = catTree.getTree().getSubtree();
				for (Subtree subTree : subTrees) {
					if (subTree.getName().equals(layerName)) {
						String metaDataObjId = subTree.getMetadataid();
						GeogigCat catFeatureType = catObj.executeCommand(url, user, pw, repoName, metaDataObjId);
						attrTypes = catFeatureType.getFeaturetype().getAttribute();
					}
				}
				if (attrTypes != null) {
					GeogigCat catFeature = catObj.executeCommand(url, user, pw, repoName, featureId);
					Feature feature = catFeature.getFeature();
					List<Attribute> attrValues = feature.getAttribute();
					for (int i = 0; i < attrTypes.size(); i++) {
						Attribute type = attrTypes.get(i);
						type.setValue(attrValues.get(i).getValue());
					}
					featureAtt = new GeogigFeatureAttribute();
					featureAtt.setLayerName(layerName);
					featureAtt.setFeatureId(featureName);
					featureAtt.setAttributes(attrTypes);
					featureAtt.setSuccess("true");
				}
			}
		} catch (GeogigCommandException e) {
			if (e.isXml()) {
				JAXBContext jaxbContext = JAXBContext.newInstance(GeogigFeatureAttribute.class);
				Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
				featureAtt = (GeogigFeatureAttribute) unmarshaller
						.unmarshal(new StringReader(e.getResponseBodyAsString()));
			} else {
				featureAtt = new GeogigFeatureAttribute();
				featureAtt.setError(e.getMessage());
				featureAtt.setSuccess("false");
			}

		}
		return featureAtt;
	}

	@Override
	public GeogigFeatureAttribute catFeatureObject(DTGeoserverManager geoserverManager, String repoName, String path,
			String objectid) throws JAXBException {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		String[] ids = path.split("/");
		String layerName = ids[0];
		String featureName = ids[1];
		GeogigFeatureAttribute featureAtt = null;
		try {
			CatObject catObj = new CatObject();
			GeogigCat geogigCat = catObj.executeCommand(url, user, pw, repoName, objectid);
			Feature feature = geogigCat.getFeature();
			List<Attribute> attrValues = feature.getAttribute();
			if (attrValues != null) {
				LsTreeRepository lsTreeRepos = new LsTreeRepository();
				GeogigRevisionTree geogigLsTree = lsTreeRepos.executeCommand(url, user, pw, repoName, path, true);
				List<Node> nodes = geogigLsTree.getNodes();
				for (Node node : nodes) {
					if (path.equalsIgnoreCase(node.getPath())) {
						String metaId = node.getMetadataId();
						GeogigCat geogigCatMeta = catObj.executeCommand(url, user, pw, repoName, metaId);
						FeatureType featureType = geogigCatMeta.getFeaturetype();
						List<Attribute> attrTypes = featureType.getAttribute();
						for (int i = 0; i < attrTypes.size(); i++) {
							Attribute type = attrTypes.get(i);
							type.setValue(attrValues.get(i).getValue());
						}
						featureAtt = new GeogigFeatureAttribute();
						featureAtt.setLayerName(layerName);
						featureAtt.setFeatureId(featureName);
						featureAtt.setAttributes(attrTypes);
						featureAtt.setSuccess("true");
					}
				}
			}
		} catch (GeogigCommandException e) {
			if (e.isXml()) {
				JAXBContext jaxbContext = JAXBContext.newInstance(GeogigFeatureAttribute.class);
				Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
				featureAtt = (GeogigFeatureAttribute) unmarshaller
						.unmarshal(new StringReader(e.getResponseBodyAsString()));
			} else {
				featureAtt = new GeogigFeatureAttribute();
				featureAtt.setError(e.getMessage());
				featureAtt.setSuccess("false");
			}
		}
		return featureAtt;
	}
}

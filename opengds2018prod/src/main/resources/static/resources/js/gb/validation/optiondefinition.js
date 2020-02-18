/**
 * @classdesc 사용자 설정 레이어 검수 옵션 정의 객체
 * 
 * @class gb.validation.OptionDefinition
 * @memberof gb.validation
 * @param {Object}
 *            obj - 생성자 옵션을 담은 객체
 * @param {string}
 *            [obj.locale="en"] - 사용할 언어 ko | en
 * @param {HTMLElement}
 *            obj.append - 검수 항목 정의 영역을 포함할 부모 HTMLElement
 * @param {HTMLElement}
 *            obj.fileClass - 검수 항목 정의 파일을 업로드할 input file 객체
 * @param {HTMLElement}
 *            obj.msgClass - 알림 영역을 포함을 부모 HTMLElement
 * @param {gb.validation.LayerDefinition}
 *            obj.layerDefinition - 검수 항목을 적용할 레이어 정의 객체
 * @author SOYIJUN
 */
var gb;
if (!gb)
	gb = {};
if (!gb.validation)
	gb.validation = {};
gb.validation.OptionDefinition = function(obj) {
	var that = this;
	var options = obj ? obj : {};
	/**
	 * @private
	 * @type {string}
	 */
	this.locale = options.locale ? options.locale : "en";
	/**
	 * 번역 정보
	 * 
	 * @private
	 * @type {Object}
	 */
	this.translation = {
			"validItemChgMsg" : {
				"ko" : "[검수 항목 정의]가 변경 되었습니다.",
				"en" : "[Validation Item Definition] has been changed."
			},
			"borderLayerMsg" : {
				"ko" : "도곽선으로 사용할 레이어 코드를 선택하세요.",
				"en" : "Choose layer to be used as border layer"
			},
			"borderLayer" : {
				"ko" : "도곽선 설정",
				"en" : "Border Layer"
			},
			"dissolve" : {
				"ko" : "인접 속성 병합 오류",
				"en" : "Discord of adjacent attribute"
			},
			"fEntityInHole" : {
				"ko" : "홀 존재 오류(임상도)",
				"en" : "Holes in polygons"
			},
			"twistedPolygon" : {
				"ko" : "꼬인 객체 오류",
				"en" : "Twisted polygons"
			},
			"refAttributeMiss" : {
				"ko" : "인접 요소 속성 오류",
				"en" : "Missing attribute of adjacent features"
			},
			"nodeMiss" : {
				"ko" : "노드 오류",
				"en" : "Missing node"
			},
			"dRefEntityNone" : {
				"ko" : "인접 요소 부재 오류",
				"en" : "Missing adjacent feature"
			},
			"fRefEntityNone" : {
				"ko" : "인접 요소 부재 오류",
				"en" : "Missing adjacent feature"
			},
			"entityDuplicated" : {
				"ko" : "요소 중복 오류",
				"en" : "Duplicated features"
			},
			"selfEntity" : {
				"ko" : "단독 존재 오류",
				"en" : "Overlapping features"
			},
			"outBoundary" : {
				"ko" : "경계 초과 오류",
				"en" : "Boundary mismatch"
			},
			"pointDuplicated" : {
				"ko" : "중복점 오류",
				"en" : "Duplicated points"
			},
			"smallLength" : {
				"ko" : "허용 범위 길이",
				"en" : "Segments between length tolerance limit"
			},
			"smallArea" : {
				"ko" : "허용 범위 면적",
				"en" : "Areas between tolerance limit"
			},
			"conIntersected" : {
				"ko" : "등고선 교차 오류",
				"en" : "Contour line intersections"
			},
			"conOverDegree" : {
				"ko" : "등고선 꺾임 오류",
				"en" : "Unsmooth contour line curves"
			},
			"conBreak" : {
				"ko" : "등고선 끊김 오류",
				"en" : "Contour line disconnections"
			},
			"zValueAmbiguous" : {
				"ko" : "고도값 오류",
				"en" : "Wrong elevation"
			},
			"uselessPoint" : {
				"ko" : "등고선 직선화 미처리",
				"en" : "Useless points in contour line"
			},
			"overshoot" : {
				"ko" : "기준점 초과",
				"en" : "Feature crossing the sheet"
			},
			"entityOpenMiss" : {
				"ko" : "객체 폐합 오류",
				"en" : "Unclosed feature"
			},
			"oneAcre" : {
				"ko" : "지류계 오류",
				"en" : "Mismatching farmland size (Total)"
			},
			"oneStage" : {
				"ko" : "경지계 오류",
				"en" : "Excluded farmland (Part)"
			},
			"symbolOut" : {
				"ko" : "객체 포함 오류",
				"en" : "Symbol misplacement"
			},
			"buildingSiteMiss" : {
				"ko" : "건물 부지 오류",
				"en" : "Land and facility mismatch"
			},
			"boundaryMiss" : {
				"ko" : "경계 누락 오류",
				"en" : "Missing boundary"
			},
			"centerLineMiss" : {
				"ko" : "중심선 누락 오류",
				"en" : "Missing centerline"
			},
			"entityInHole" : {
				"ko" : "홀 중복 오류",
				"en" : "Hole with entity"
			},
			"holeMisplacement" : {
				"ko" : "홀 존재 오류",
				"en" : "Hole misplacement"
			},
			"linearDisconnection" : {
				"ko" : "선형 단락 오류",
				"en" : "Linear disconnection"
			},
			"multiPart" : {
				"ko" : "멀티 파트 오류",
				"en" : "Selection of wrong multiple parts"
			},
			"bridgeName" : {
				"ko" : "교량명 오류",
				"en" : "Wrong bridge name"
			},
			"adminMiss" : {
				"ko" : "행정 경계 오류",
				"en" : "Administrative boundary mismatch"
			},
			"numericalValue" : {
				"ko" : "수치값 오류",
				"en" : "Wrong numerical value"
			},
			"ufidMiss" : {
				"ko" : "UFID 오류",
				"en" : "Missing UFID"
			},
			"refZValueMiss" : {
				"ko" : "인접 요소 고도값 오류",
				"en" : "Wrong elevation of adjacent feature"
			},
			"uavrgdph10" : {
				"ko" : "평균 심도 오류(정위치)",
				"en" : "Wrong mean depth(Graphic) (Underground)"
			},
			"uavrgdph20" : {
				"ko" : "평균 심도 오류(구조화)",
				"en" : "Wrong mean depth(Attribute) (Underground)"
			},
			"uleaderline" : {
				"ko" : "지시선 교차 오류",
				"en" : "Leader line overlapping (Underground)"
			},
			"uNodeMiss" : {
				"ko" : "시설물 선형 노드 오류",
				"en" : "Missing node on line (Underground)"
			},
			"uSymbolDirection" : {
				"ko" : "시설물 심볼 방향 오류",
				"en" : "Mismatching direction of symbol (Underground)"
			},
			"uSymbolInLine" : {
				"ko" : "선형내 심볼 미존재 오류",
				"en" : "Missing symbol on line (Underground)"
			},
			"uLineCross" : {
				"ko" : "관로 상하월 오류",
				"en" : "Crossing pipes (Underground)"
			},
			"uSymbolsDistance" : {
				"ko" : "심볼 간격 오류",
				"en" : "Distance between symbols (Underground)"
			},
			"uSymbolOut" : {
				"ko" : "심볼 단독 존재 오류",
				"en" : "Symbol misplacement (Underground)"
			},
			"fCodeLogicalAttribute" : {
				"ko" : "F Code 오류",
				"en" : "Wrong F Code (Forest)"
			},
			"fLabelLogicalAttribute" : {
				"ko" : "Label 오류",
				"en" : "Wrong F Label (Forest)"
			},
			"valItemSetting" : {
				"ko" : "검수 항목 설정",
				"en" : "Validation Items"
			},
			"chooseYourItem" : {
				"ko" : "검수 항목을 선택하세요.",
				"en" : "Choose your validation item."
			},
			"border" : {
				"ko" : "도곽선",
				"en" : "Map sheet border"
			},
			"notSet" : {
				"ko" : "미설정",
				"en" : "Not set"
			},
			"simpleCheck" : {
				"ko" : "검수 수행(세부 설정 불필요)",
				"en" : "Run"
			},
			"attrValidation" : {
				"ko" : "속성 검수",
				"en" : "Attribute"
			},
			"condValidation" : {
				"ko" : "수치 조건",
				"en" : "Condition"
			},
			"filterValidation" : {
				"ko" : "속성 필터",
				"en" : "Filter"
			},
			"addFilter" : {
				"ko" : "필터 추가",
				"en" : "Add filter"
			},
			"deleteFilter" : {
				"ko" : "필터 삭제",
				"en" : "Delete filter"
			},
			"layerRelation" : {
				"ko" : "레이어 관계",
				"en" : "Relation"
			},
			"selectRelationLayer" : {
				"ko" : "관계 레이어 선택",
				"en" : "Select relationship layer"
			},
			"selectRelationLayerDetail" : {
				"ko" : "관계 레이어 세부 설정 선택",
				"en" : "Select detail settings for the relationship layer"
			},
			"enterRelationLayerDetail" : {
				"ko" : "관계 레이어 세부 설정 입력",
				"en" : "Enter detail settings for the relationship layer"
			},
			"detailValidationSetting" : {
				"ko" : "검수 세부 설정 선택",
				"en" : "Detail setting"
			},
			"chooseYourDetail" : {
				"ko" : "세부 설정 항목을 선택하세요.",
				"en" : "Choose your detail option"
			},
			"addLayerCode" : {
				"ko" : "레이어 코드 추가",
				"en" : "Add layer code"
			},
			"code" : {
				"ko" : "코드",
				"en" : "Code"
			},
			"applyAll" : {
				"ko" : "모든 레이어 코드",
				"en" : "All layers"
			},
			"deleteLayerCode" : {
				"ko" : "레이어 코드 삭제",
				"en" : "Delete layer code"
			},
			"addAttr" : {
				"ko" : "속성 추가",
				"en" : "Add attribute"
			},
			"attrName" : {
				"ko" : "속성명",
				"en" : "Attribute name"
			},
			"attrNameEx" : {
				"ko" : "속성명 EX) 재질",
				"en" : ""
					// "en" : "Attribute name EX) material"
			},
			"acceptVal" : {
				"ko" : "허용값",
				"en" : "Acceptable values"
			},
			"acceptValEx" : {
				"ko" : "허용값들을 쉼표로 구분하여 입력 ex) 1,2,3",
				"en" : "Enter acceptable values separated by commas. ex) 1,2,3"
			},
			"figure" : {
				"ko" : "수치",
				"en" : "Figure"
			},
			"figureInterEx" : {
				"ko" : "숫자형 기준값",
				"en" : "Numeric value"
			},
			"condition" : {
				"ko" : "조건",
				"en" : "Condition"
			},
			"equal" : {
				"ko" : "같음",
				"en" : "Equal"
			},
			"excess" : {
				"ko" : "초과",
				"en" : "Exceeding"
			},
			"under" : {
				"ko" : "미만",
				"en" : "Under"
			},
			"andOver" : {
				"ko" : "이상",
				"en" : "and Over"
			},
			"andUnder" : {
				"ko" : "이하",
				"en" : "and Less"
			},
			"interval" : {
				"ko" : "간격",
				"en" : "Interval"
			},
			"deleteAttr" : {
				"ko" : "속성 삭제",
				"en" : "Delete Attribute"
			},
			"enterDetailSetting" : {
				"ko" : "검수 세부 설정 입력",
				"en" : "Enter the detail figure"
			},
			"detailGuide" : {
				"ko" : "레이어 코드를 추가한 후, 세부 설정을 입력하세요.",
				"en" : "Add a new layer code, then enter details."
			},
			"detailGuideNone" : {
				"ko" : "필터를 추가한 후, 세부 설정을 입력하세요.(모든 분류 및 레이어에 적용됩니다.)",
				"en" : "After adding the filter, enter the details.(Applies to all categories and layers.)"
			},
			"selectCat" : {
				"ko" : "분류 설정",
				"en" : "Select Category"
			},
			"chooseYourCat" : {
				"ko" : "검수할 분류를 선택하세요.",
				"en" : "Choose the category to validate."
			},
			"allCat" : {
				"ko" : "모든 레이어 분류",
				"en" : "All categorys"
			},
			"notice" : {
				"ko" : "알림",
				"en" : "Notice"
			},
			"askReset" : {
				"ko" : "해당 조건의 설정을 모두 삭제 하시겠습니까?",
				"en" : "Are you sure you want to delete all of these settings on this item?"
			},
			"askDelCode" : {
				"ko" : "레이어 코드를 삭제 하시겠습니까?",
				"en" : "Are you sure you want to delete the layer code?"
			},
			"askDelAttr" : {
				"ko" : "속성을 삭제 하시겠습니까?",
				"en" : "Are you sure you want to delete the attribute?"
			},
			"delCatModalTitle" : {
				"en" : "Delete Category",
				"ko" : "분류 삭제"
			},
			"delLayerModalTitle" : {
				"en" : "Delete Layer",
				"ko" : "레이어 삭제"
			},
			"delOptModalTitle" : {
				"en" : "Delete Option",
				"ko" : "옵션 삭제"
			},
			"resetOptTitle" : {
				"en" : "Clear Settings",
				"ko" : "설정 모두 삭제"
			},
			"nodataoutput" : {
				"en" : "No settings to export.",
				"ko" : "내보낼 설정이 없습니다."
			},
			"emptyobj" : {
				"en" : "There is no defined validation item.",
				"ko" : "정의된 검수 항목이 없습니다."
			},
			"nobordercode" : {
				"en" : "Border layer code is not entered.",
				"ko" : "도곽선 Code가 입력되지 않았습니다."
			},
			"nobordergeom" : {
				"en" : "Border layer geometry is not entered.",
				"ko" : "도곽선 Geometry가 입력되지 않았습니다."
			},
			"invalidkeyname" : {
				"en" : " - This key name is invalid.",
				"ko" : " - 키 네임은 유효하지 않습니다."
			},
			"invaliditem" : {
				"en" : " - This validation item is invalid.",
				"ko" : " - 검수 항목이 유효하지 않습니다."
			},
			"nocatname" : {
				"en" : "th category name must be entered.",
				"ko" : "번째 분류의 분류명을 입력해야 합니다."
			},
			"nolayercode" : {
				"en" : " - layer code is not entered in the layer definition.",
				"ko" : "레이어 코드는 레이어 정의에 입력되어 있지 않습니다."
			},
			"cat" : {
				"en" : "Category",
				"ko" : "분류"
			},
			"layercode" : {
				"en" : "Layer code",
				"ko" : "레이어 코드"
			},
			"valuesnullorarr" : {
				"en" : "The values must be NULL or an array type.",
				"ko" : "값은 NULL 또는 배열 형태여야 합니다."
			},
			"attrnullorarr" : {
				"en" : "The attribute must be NULL or an array type.",
				"ko" : "속성 검수는 NULL 또는 배열 형태여야 합니다."
			},
			"filternullorarr" : {
				"en" : "The filter must be NULL or an array type.",
				"ko" : "속성 필터는 NULL 또는 배열 형태여야 합니다."
			},
			"figurenullorarr" : {
				"en" : "The condition must be NULL or an array type.",
				"ko" : "수치 조건은 NULL 또는 배열 형태여야 합니다."
			},
			"tolernullorarr" : {
				"en" : "The tolerance must be NULL or an array type.",
				"ko" : "톨러런스 NULL 또는 배열 형태여야 합니다."
			},
			"relnullorarr" : {
				"en" : "The condition must be NULL or an array type.",
				"ko" : "수치 조건은 NULL 또는 배열 형태여야 합니다."
			},
			"defnull" : {
				"en" : "The definition key must be an array.",
				"ko" : "definition 키는 배열 형태여야 합니다."
			},
			"failimport" : {
				"en" : "Setting input failed.",
				"ko" : "설정 입력에 실패하였습니다."
			},
			"readfail" : {
				"en" : "Unable to read file.",
				"ko" : "파일을 읽을 수 없습니다."
			},
			"clearsetting" : {
				"en" : "Clear Settings",
				"ko" : "설정 모두 삭제"
			},
			"cancel" : {
				"en" : "Cancel",
				"ko" : "취소"
			},
			"delete" : {
				"en" : "Delete",
				"ko" : "삭제"
			},
			"numericalValues": {
				"en" : "Range discrepancy",
				"ko" : "범위 불일치"
			},
			"fixValues": {
				"en" : "Name of general house",
				"ko" : "일반 주택의 주기"
			},
			"refAttributeMissB": {
				"en" : "Centerline property mismatch",
				"ko" : "중심선 속성 불일치"
			},
			"nfidIntegrity": {
				"en" : "NFID Error of modified / deleted object",
				"ko" : "수정/삭제 객체 NFID오류"
			},
			"nfidDuplicated": {
				"en" : "Duplicated centerline NFID",
				"ko" : "중심선 NFID 중복"
			},
			"refNFIDMiss": {
				"en" : "Road boundary NFID mismatch",
				"ko" : "경계면 참조 NFID 불일치"
			},
			"entityDangled": {
				"en" : "Dangling entity",
				"ko" : "댕글링"
			},
			"entityInHoleB": {
				"en" : "Same entity as a hole",
				"ko" : "홀(Hole)과동일한객체존재"
			},
			"conBreakB": {
				"en" : "Contour line disconnections",
				"ko" : "등고선 단락/등고선 미연결"
			},
			"outBoundaryB": {
				"en" : "Boundary mismatch",
				"ko" : "경계 불일치"
			},
			"underShootB": {
				"en" : "Linestring not reaching the boundary",
				"ko" : "언더슛"
			},
			"overShootB": {
				"en" : "Linestring crossing the boundary",
				"ko" : "오버슛"
			},
			"entityTwisted": {
				"en" : "Twisted entity",
				"ko" : "꼬임 선형 객체"
			},
			"smallAreaB": {
				"en" : "Areas between tolerance limit",
				"ko" : "미세 면적 객체"
			},
			"smallLengthB": {
				"en" : "Areas between tolerance limit",
				"ko" : "짧은 선형 객체"
			},
			"pointDuplicatedB": {
				"en" : "Duplicated points",
				"ko" : "정점 중복 선형 객체"
			},
			"entityDuplicatedB": {
				"en" : "Duplicated features",
				"ko" : "중복 객체"
			},
			"centerLineMissB": {
				"en" : "Missing centerline",
				"ko" : "중심선 미존재"
			},
			"nodeMissB": {
				"en" : "Missing node",
				"ko" : "중심선 누락/경계면 누락"
			},
			"centerLineDisconnected": {
				"en" : "Defective centerline connection",
				"ko" : "결함있는 연결"
			},
			"selfEntityB": {
				"en" : "Overlapping features",
				"ko" : "경계 침범"
			},
			"sliverEntity": {
				"en" : "Slivers of entities",
				"ko" : "슬리버 객체"
			},
			"conOverDegreeB": {
				"en" : "Unsmooth contour line curves",
				"ko" : "등고선 꺾임"
			},
			"conIntersectedB": {
				"en" : "Contour line intersections",
				"ko" : "등고선 교차"
			},
			"nomoreadd": {
				"en" : "You can not set the same layer code twice.",
				"ko" : "같은 레이어 코드를 두 번 설정할 수 없습니다."
			},
			"connFilter": {
				"en" : "Connected filter",
				"ko" : "연결된 속성 필터"
			},
			"noselect": {
				"en" : "Not selected",
				"ko" : "선택 안함"
			},
			"crossRoadMiss": {
				"en" : "Missing intersections",
				"ko" : "교차로 미존재"
			},
			"featureFilter": {
				"en" : "Feature Filter",
				"ko" : "객체 필터"
			},
			"editingState": {
				"en" : "Editing State",
				"ko" : "편집 상태 속성"
			}

	}
	/**
	 * 검수 항목 정보
	 * 
	 * @private
	 * @type {Object}
	 */
	this.optItem = {
			"EditingState" : {
				"title" : this.translation.editingState[this.locale],
				"alias" : "EditingState",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline" ],
				"purpose" : "none",
				"noparam" : false,
				"filter" : {
					"code" : true,
					"key" : true,
					"values" : true
				},
				"figure" : {
					"code" : false,
					"key" : false,
					"values" : false,
					"number" : false,
					"condition" : false,
					"interval" : false
				},
				"tolerance" : {
					"code" : false,
					"value" : false,
					"condition" : false,
					"interval" : false
				},
				"relation" : {
					"name" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					}

				}
			},
			"FeatureFilter" : {
				"title" : this.translation.featureFilter[this.locale],
				"alias" : "FeatureFilter",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline" ],
				"purpose" : "none",
				"noparam" : false,
				"filter" : {
					"code" : true,
					"key" : true,
					"values" : true
				},
				"figure" : {
					"code" : false,
					"key" : false,
					"values" : false,
					"number" : false,
					"condition" : false,
					"interval" : false
				},
				"tolerance" : {
					"code" : false,
					"value" : false,
					"condition" : false,
					"interval" : false
				},
				"relation" : {
					"name" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					}

				}
			},
			"CrossRoadMiss" : {
				"title" : this.translation.crossRoadMiss[this.locale],
				"alias" : "CrossRoadMiss",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false,
						"filter" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : true,
							"key" : true,
							"values" : true
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"ConIntersectedB" : {
				"title" : this.translation.conIntersectedB[this.locale],
				"alias" : "ConIntersectedB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false,
						"filter" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"ConOverDegreeB" : {
				"title" : this.translation.conOverDegreeB[this.locale],
				"alias" : "ConOverDegreeB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"SliverEntity" : {
				"title" : this.translation.sliverEntity[this.locale],
				"alias" : "SliverEntity",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"SelfEntityB" : {
				"title" : this.translation.selfEntityB[this.locale],
				"alias" : "SelfEntityB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : true,
							"key" : true,
							"values" : true
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"CenterLineDisconnected" : {
				"title" : this.translation.centerLineDisconnected[this.locale],
				"alias" : "CenterLineDisconnected",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : true,
							"key" : true,
							"values" : true
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"NodeMissB" : {
				"title" : this.translation.nodeMissB[this.locale],
				"alias" : "NodeMissB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : true,
							"key" : true,
							"values" : true
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"CenterLineMissB" : {
				"title" : this.translation.centerLineMissB[this.locale],
				"alias" : "CenterLineMissB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : true,
							"key" : true,
							"values" : true
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"EntityDuplicatedB" : {
				"title" : this.translation.entityDuplicatedB[this.locale],
				"alias" : "EntityDuplicatedB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"PointDuplicatedB" : {
				"title" : this.translation.pointDuplicatedB[this.locale],
				"alias" : "PointDuplicatedB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"SmallLengthB" : {
				"title" : this.translation.smallLengthB[this.locale],
				"alias" : "SmallLengthB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"SmallAreaB" : {
				"title" : this.translation.smallAreaB[this.locale],
				"alias" : "SmallAreaB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"EntityTwisted" : {
				"title" : this.translation.entityTwisted[this.locale],
				"alias" : "EntityTwisted",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"OverShootB" : {
				"title" : this.translation.overShootB[this.locale],
				"alias" : "OverShootB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"UnderShootB" : {
				"title" : this.translation.underShootB[this.locale],
				"alias" : "UnderShootB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"OutBoundaryB" : {
				"title" : this.translation.outBoundaryB[this.locale],
				"alias" : "OutBoundaryB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : true,
							"key" : true,
							"values" : true
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"ConBreakB" : {
				"title" : this.translation.conBreakB[this.locale],
				"alias" : "ConBreakB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false,
						"filter" : true
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : true,
							"key" : true,
							"values" : true
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"EntityInHoleB" : {
				"title" : this.translation.entityInHoleB[this.locale],
				"alias" : "EntityInHoleB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"EntityDangled" : {
				"title" : this.translation.entityDangled[this.locale],
				"alias" : "EntityDangled",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"RefNFIDMiss" : {
				"title" : this.translation.refNFIDMiss[this.locale],
				"alias" : "RefNFIDMiss",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false,
						"filter" : true
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : true,
							"key" : true,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false,
							"filter" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"NFIDDuplicated" : {
				"title" : this.translation.nfidDuplicated[this.locale],
				"alias" : "NFIDDuplicated",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false,
						"filter" : true
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"NFIDIntegrity" : {
				"title" : this.translation.nfidIntegrity[this.locale],
				"alias" : "NFIDIntegrity",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : true,
						"number" : false,
						"condition" : false,
						"interval" : false,
						"filter" : true
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"RefAttributeMissB" : {
				"title" : this.translation.refAttributeMissB[this.locale],
				"alias" : "RefAttributeMissB",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false,
						"filter" : true
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : true,
							"key" : true,
							"values" : true
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"FixValues" : {
				"title" : this.translation.fixValues[this.locale],
				"alias" : "FixValues",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false,
						"filter" : true
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"NumericalValues" : {
				"title" : this.translation.numericalValues[this.locale],
				"alias" : "NumericalValues",
				"category" : [ "basic" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : true,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : true,
						"condition" : true,
						"interval" : false,
						"filter" : true
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"BorderLayer" : {
				"title" : this.translation.borderLayer[this.locale],
				"alias" : "BorderLayer",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline" ],
				"purpose" : "none",
				"noparam" : false,
				"filter" : {
					"code" : false,
					"key" : false,
					"values" : false
				},
				"figure" : {
					"code" : false,
					"key" : false,
					"values" : false,
					"number" : false,
					"condition" : false,
					"interval" : false
				},
				"tolerance" : {
					"code" : false,
					"value" : false,
					"condition" : false,
					"interval" : false
				},
				"relation" : {
					"name" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					}

				}
			},
			"Dissolve" : {
				"title" : this.translation.dissolve[this.locale],
				"alias" : "Dissolve",
				"category" : [ "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"FEntityInHole" : {
				"title" : this.translation.fEntityInHole[this.locale],
				"alias" : "FEntityInHole",
				"category" : [ "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"TwistedPolygon" : {
				"title" : this.translation.twistedPolygon[this.locale],
				"alias" : "TwistedPolygon",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"RefAttributeMiss" : {
				"title" : this.translation.refAttributeMiss[this.locale],
				"alias" : "RefAttributeMiss",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "adjacent",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"NodeMiss" : {
				"title" : this.translation.nodeMiss[this.locale],
				"alias" : "NodeMiss",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"DRefEntityNone" : {
				"title" : this.translation.dRefEntityNone[this.locale],
				"alias" : "DRefEntityNone",
				"category" : [ "numetrical" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "adjacent",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"FRefEntityNone" : {
				"title" : this.translation.fRefEntityNone[this.locale],
				"alias" : "RefEntityNone",
				"category" : [ "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "adjacent",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"EntityDuplicated" : {
				"title" : this.translation.entityDuplicated[this.locale],
				"alias" : "EntityDuplicated",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"SelfEntity" : {
				"title" : this.translation.selfEntity[this.locale],
				"alias" : "SelfEntity",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"OutBoundary" : {
				"title" : this.translation.outBoundary[this.locale],
				"alias" : "OutBoundary",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"PointDuplicated" : {
				"title" : this.translation.pointDuplicated[this.locale],
				"alias" : "PointDuplicated",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"SmallLength" : {
				"title" : this.translation.smallLength[this.locale],
				"alias" : "SmallLength",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"SmallArea" : {
				"title" : this.translation.smallArea[this.locale],
				"alias" : "SmallArea",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"ConIntersected" : {
				"title" : this.translation.conIntersected[this.locale],
				"alias" : "ConIntersected",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"ConOverDegree" : {
				"title" : this.translation.conOverDegree[this.locale],
				"alias" : "ConOverDegree",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"ConBreak" : {
				"title" : this.translation.conBreak[this.locale],
				"alias" : "ConBreak",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"ZValueAmbiguous" : {
				"title" : this.translation.zValueAmbiguous[this.locale],
				"alias" : "ZValueAmbiguous",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : true,
						"condition" : true,
						"interval" : true
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"UselessPoint" : {
				"title" : this.translation.uselessPoint[this.locale],
				"alias" : "UselessPoint",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"OverShoot" : {
				"title" : this.translation.overshoot[this.locale],
				"alias" : "OverShoot",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"EntityOpenMiss" : {
				"title" : this.translation.entityOpenMiss[this.locale],
				"alias" : "EntityOpenMiss",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"OneAcre" : {
				"title" : this.translation.oneAcre[this.locale],
				"alias" : "OneAcre",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"OneStage" : {
				"title" : this.translation.oneStage[this.locale],
				"alias" : "OneStage",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"SymbolOut" : {
				"title" : this.translation.symbolOut[this.locale],
				"alias" : "SymbolOut",
				"category" : [ "numetrical" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"BuildingSiteMiss" : {
				"title" : this.translation.buildingSiteMiss[this.locale],
				"alias" : "BuildingSiteMiss",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : true,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"BoundaryMiss" : {
				"title" : this.translation.boundaryMiss[this.locale],
				"alias" : "BoundaryMiss",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"CenterLineMiss" : {
				"title" : this.translation.centerLineMiss[this.locale],
				"alias" : "CenterLineMiss",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"EntityInHole" : {
				"title" : this.translation.entityInHole[this.locale],
				"alias" : "EntityInHole",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"HoleMisplacement" : {
				"title" : this.translation.holeMisplacement[this.locale],
				"alias" : "HoleMisplacement",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"LinearDisconnection" : {
				"title" : this.translation.linearDisconnection[this.locale],
				"alias" : "LinearDisconnection",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"MultiPart" : {
				"title" : this.translation.multiPart[this.locale],
				"alias" : "MultiPart",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"BridgeName" : {
				"title" : this.translation.bridgeName[this.locale],
				"alias" : "BridgeName",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : true,
							"key" : true,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"AdminMiss" : {
				"title" : this.translation.adminMiss[this.locale],
				"alias" : "AdminMiss",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"NumericalValue" : {
				"title" : this.translation.numericalValue[this.locale],
				"alias" : "NumericalValue",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : true,
						"condition" : true,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"UFIDMiss" : {
				"title" : this.translation.ufidMiss[this.locale],
				"alias" : "UFIDMiss",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"RefZValueMiss" : {
				"title" : this.translation.refZValueMiss[this.locale],
				"alias" : "RefZValueMiss",
				"category" : [ "numetrical", "underground", "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "adjacent",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : true,
						"value" : true,
						"condition" : true,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"UAvrgDPH10" : {
				"title" : this.translation.uavrgdph10[this.locale],
				"alias" : "UAvrgDPH10",
				"category" : [ "underground" ],
				"version" : [ "qa1" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : true,
							"value" : true,
							"condition" : true,
							"interval" : true
						}
					}
			},
			"UAvrgDPH20" : {
				"title" : this.translation.uavrgdph20[this.locale],
				"alias" : "UAvrgDPH20",
				"category" : [ "underground" ],
				"version" : [ "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : true,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"ULeaderline" : {
				"title" : this.translation.uleaderline[this.locale],
				"alias" : "ULeaderline",
				"category" : [ "underground" ],
				"version" : [ "qa1" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"UNodeMiss" : {
				"title" : this.translation.uNodeMiss[this.locale],
				"alias" : "UNodeMiss",
				"category" : [ "underground" ],
				"version" : [ "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"USymbolDirection" : {
				"title" : this.translation.uSymbolDirection[this.locale],
				"alias" : "USymbolDirection",
				"category" : [ "underground" ],
				"version" : [ "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"USymbolInLine" : {
				"title" : this.translation.uSymbolInLine[this.locale],
				"alias" : "USymbolInLine",
				"category" : [ "underground" ],
				"version" : [ "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : true,
						"values" : true
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"ULineCross" : {
				"title" : this.translation.uLineCross[this.locale],
				"alias" : "ULineCross",
				"category" : [ "underground" ],
				"version" : [ "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"USymbolsDistance" : {
				"title" : this.translation.uSymbolsDistance[this.locale],
				"alias" : "USymbolsDistance",
				"category" : [ "underground" ],
				"version" : [ "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : true,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"USymbolOut" : {
				"title" : this.translation.uSymbolOut[this.locale],
				"alias" : "USymbolOut",
				"category" : [ "underground" ],
				"version" : [ "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "graphic",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : false,
						"key" : false,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : true,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"FCodeLogicalAttribute" : {
				"title" : this.translation.fCodeLogicalAttribute[this.locale],
				"alias" : "FCodeLogicalAttribute",
				"category" : [ "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : false,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"name" : false,
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			},
			"FLabelLogicalAttribute" : {
				"title" : this.translation.fLabelLogicalAttribute[this.locale],
				"alias" : "FLabelLogicalAttribute",
				"category" : [ "forest" ],
				"version" : [ "qa1", "qa2" ],
				"geometry" : [ "point", "multipoint", "linestring", "multilinestring", "polygon", "multipolygon", "polyline", "lwpolyline",
					"text", "insert" ],
					"purpose" : "attribute",
					"noparam" : false,
					"filter" : {
						"code" : false,
						"key" : false,
						"values" : false
					},
					"figure" : {
						"code" : true,
						"key" : true,
						"values" : true,
						"number" : false,
						"condition" : false,
						"interval" : false
					},
					"tolerance" : {
						"code" : false,
						"value" : false,
						"condition" : false,
						"interval" : false
					},
					"relation" : {
						"filter" : {
							"code" : false,
							"key" : false,
							"values" : false
						},
						"figure" : {
							"code" : false,
							"key" : false,
							"values" : false,
							"number" : false,
							"condition" : false,
							"interval" : false
						},
						"tolerance" : {
							"code" : false,
							"value" : false,
							"condition" : false,
							"interval" : false
						}
					}
			}
	}

	this.structure = {
			"border" : null,
			"definition" : []
	};

	// 수치지도, 지하시설물, 임상도
	// nm, ug, fr
	this.qaCat = undefined;

	// 정위치, 구조화
	// qa1, qa2
	this.qaVer = undefined;

	this.layerDef = options.layerDefinition ? options.layerDefinition : undefined;
	/**
	 * @private
	 * @type {HTMLElement}
	 */
	this.navi = $("<ol>").addClass("breadcrumb").addClass("gb-optiondefinition-navigation");
	/**
	 * @private
	 * @type {HTMLElement}
	 */
	this.message = $("<div>").addClass("alert").addClass("alert-info").attr("role", "alert");
	/**
	 * @private
	 * @type {HTMLElement}
	 */
	this.optionArea = $("<div>").addClass("well");
	/**
	 * @private
	 * @type {HTMLElement}
	 */
	this.panelBody = $("<div>").addClass("gb-optiondefinition-body").append(this.navi).append(this.message).append(this.optionArea);
	/**
	 * @private
	 * @type {HTMLElement}
	 */
	this.panel = $("<div>").append(this.panelBody);
	$(options.append).append(this.panel);
	/**
	 * 현재 분류
	 * 
	 * @private
	 * @type {Object}
	 */
	this.nowCategory = undefined;
	/**
	 * 현재 검수 항목 단독 존재 오류
	 * 
	 * @private
	 * @type {Object}
	 */
	this.nowOption = undefined;
	/**
	 * 현재 세부 옵션 종류 필터 피규어 톨러런스 릴레이션
	 * 
	 * @private
	 * @type {Object}
	 */
	this.nowDetailCategory = undefined;
	/**
	 * 세부 옵션이 릴레이션일때 릴레이션 분류
	 * 
	 * @private
	 * @type {Object}
	 */
	this.nowRelationCategory = undefined;
	/**
	 * 세부 옵션이 릴레이션을때 릴레이션 세부 옵션 종류
	 * 
	 * @private
	 * @type {Object}
	 */
	this.nowRelationDetailCategory = undefined;
	/**
	 * @private
	 * @type {HTMLElement}
	 */
	this.msg = options.msgClass;
	/**
	 * @private
	 * @type {HTMLElement}
	 */
	this.fileParent = undefined;
	/**
	 * @private
	 * @type {HTMLElement}
	 */
	this.fileClass = undefined;
	/**
	 * @private
	 * @type {HTMLElement}
	 */
	this.file = $(options.fileClass)[0];	
	if (this.file !== undefined) {
		this.fileClass = $(this.file).attr("class");
	}
	var jclass = "." + this.fileClass;
	this.fileParent = $(jclass).parent();
	$(this.fileParent).on("change", jclass, function(event) {
		var fileList = that.file.files;
		var reader = new FileReader();
		if (fileList.length === 0) {
			return;
		}
		reader.readAsText(fileList[0]);
		$(reader).on("load", function(event) {
			try {
				var obj = JSON.parse(reader.result);
			} catch (e) {
				that.setMessagePopup("danger", " " + that.translation.readfail[that.locale]);
				return;
			}
			that.setStructure(obj);
			that.updateStructure();
		});
		$(that.file).remove();
		that.file = $("<input>").attr({
			"type" : "file"
		}).css("display", "none").addClass(that.fileClass)[0];
		$(that.fileParent).append(that.file);
	});

	// 노 파라미터 모든 분류 체크 박스
	$(this.panelBody).on("change", ".gb-optiondefinition-check-noparamoption-all", function() {
		that.setNoParamOption(this, true);
		console.log(that.getStructure());
	});
	// 모든 레이어 선택
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-relationcategory-all", function() {
		that.printOptionCategory(this, false, true, true);
	});
	// 보더 셀렉트 변경시 도곽선 설정
	$(this.panelBody).on("change", ".gb-optiondefinition-select-border", function() {
		that.setBorderLayer(this);
		console.log(that.getStructure());
	});
	// 필터 추가
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-addfilter", function() {
		that.addFilterRow(this);
	});
	// 피규어 추가
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-addfigure", function() {
		that.addFigureRow(this);
	});
	// 톨러런스 추가
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-addtolerance", function() {
		that.addToleranceRow(this);
	});

	// 네비게이터 분류 클릭시 분류 표시
	$(this.panelBody).on("click", ".gb-optiondefinition-navi-category", function() {
		that.printCategory();
	});
	// 버튼 분류 클릭시 다음 단계 옵션 표시
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-category", function() {
		that.printOption(this, false);
	});

	// 네비게이터 옵션 클릭시 검수 항목 표시
	$(this.panelBody).on("click", ".gb-optiondefinition-navi-option", function() {
		that.printOption(this, true);
	});
	// 버튼 옵션 클릭시 다음 단계 세부 설정 종류 표시
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-option", function() {
		that.printOptionCategory(this, false);
	});

	// 네비게이터 세부 옵션 종류 클릭시 세부 옵션 종류 표시
	$(this.panelBody).on("click", ".gb-optiondefinition-navi-detailcategory", function() {
		that.printOptionCategory(this, true);
	});
	// 버튼 세부 옵션 종류 클릭시 다음 단계 세부 설정 입력 표시
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-detailcategory", function() {
		that.printDetailForm(this, false);
	});

	// 네비게이터 릴레이션 카테고리 클릭시 릴레이션 카테고리 표시
	$(this.panelBody).on("click", ".gb-optiondefinition-navi-relationcategory", function() {
		that.printCategory(true);
	});
	// 버튼 릴레이션 카테고리 클릭시 다음 단계 세부 설정 종류 표시
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-relationcategory", function() {
		// that.printDetailForm(this, false);
		that.printOptionCategory(this, false, true);
	});
	// 네비게이터 디테일 옵션 타입 선택시 해당 단계로 이동
	$(this.panelBody).on("click", ".gb-optiondefinition-navi-relationdetailcategory", function() {
		that.printOptionCategory(this, true, true);
	});
	// 네비게이터 디테일 옵션 타입 선택시 해당 단계로 이동 (모든 분류)
	$(this.panelBody).on("click", ".gb-optiondefinition-navi-relationdetailcategory-all", function() {
		that.printOptionCategory(this, true, true, true);
	});
	// 버튼 릴레이션 카테고리 클릭시 다음 단계 세부 설정 종류 표시
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-relationdetailcategory", function() {
		that.printDetailForm(this, false, true);
	});
	// 모든 분류 선택 후 버튼 릴레이션 카테고리 클릭시 다음 단계 세부 설정 종류 표시
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-relationdetailcategory-all", function() {
		that.printDetailForm(this, false, true, true);
	});

	// 속성 필터 레이어 코드 추가 버튼 클릭
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-filteraddcode", function() {
		that.addLayerCodeFilter(this);
	});

	// 속성 필터 레이어 코드 추가 버튼 클릭
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-filteradd-nonepurpose", function() {
		// that.addLayerCodeFilter(this);
		that.addFilterRowForNone(this);
	});

	// 필터 세팅 클리어 버튼 클릭
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-clearfiltersetting", function() {
		var callback = function() {
			that.clearSetting("filter");
		};
		that.deleteConfirmModal("reset", callback);
	});

	// 필터 세팅 클리어 버튼 클릭
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-clearfiltersetting-nonepurpose", function() {
		var callback = function() {
			that.clearSettingForNone();
		};
		that.deleteConfirmModal("reset", callback);
	});

	// 피규어 세팅 클리어 버튼 클릭
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-clearfiguresetting", function() {
		var callback = function() {
			that.clearSetting("figure");
		};
		that.deleteConfirmModal("reset", callback);
	});

	// 톨러런스 세팅 클리어 버튼 클릭
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-cleartolerancesetting", function() {
		var callback = function() {
			that.clearSetting("tolerance");
		};
		that.deleteConfirmModal("reset", callback);
	});

	// 속성 검수 레이어 코드 추가 버튼 클릭
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-figureaddcode", function() {
		that.addLayerCodeFigure(this);
	});

	// 톨러런스 레이어 코드 추가 버튼 클릭
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-toleranceaddcode", function() {
		that.addLayerCodeTolerance(this);
	});

	// 필터 코드 입력 폼 이벤트
	$(this.panelBody).on("change", ".gb-optiondefinition-select-filtercode", function() {
		that.selectFilterCode(this);
		console.log(that.getStructure());
	});

	// 노 파라미터 체크박스 이벤트
	$(this.panelBody).on("change", ".gb-optiondefinition-check-noparamoption", function() {
		that.setNoParamOption(this);
		console.log(that.getStructure());
	});

	// 필터 속성명 입력 이벤트
	$(this.panelBody).on("input", ".gb-optiondefinition-input-filterkey", function() {
		that.inputFilterKey(this);
		console.log(that.getStructure());
	});

	// 필터 속성명 입력 이벤트
	$(this.panelBody).on("input", ".gb-optiondefinition-input-filterkey-fornone", function() {
		that.inputFilterKeyForNone(this);
		console.log(that.getStructure());
	});

	// 필터 허용값 입력 이벤트
	$(this.panelBody).on("input", ".gb-optiondefinition-input-filtervalues-fornone", function() {
		that.inputFilterKeyForNone(this);
		console.log(that.getStructure());
	});

	// 모든 분류의 필터 속성명 입력 이벤트
// $(this.panelBody).on("input", ".gb-optiondefinition-input-filterkey-all",
// function() {
// that.inputFilterKey(this);
// console.log(that.getStructure());
// });

	// 필터 허용값 입력 이벤트
	$(this.panelBody).on("input", ".gb-optiondefinition-input-filtervalues", function() {
		that.inputFilterValues(this);
		console.log(that.getStructure());
	});

	// 필터 레이어 코드 삭제 버튼 클릭
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-deletelayerfilter", function() {
		var thisBtn = this;
		var callback = function() {
			that.deleteLayerCodeFilter(thisBtn);
		};
		that.deleteConfirmModal("code", callback);
		console.log(that.getStructure());
	});

	// 필터 로우 삭제 버튼 클릭
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-deletefilterrow", function() {
		var thisBtn = this;
		var callback = function() {
			that.deleteFilterRow(thisBtn);
		};
		that.deleteConfirmModal("attr", callback);
		console.log(that.getStructure());
	});

	/*
	 * // 예제 $(this.panelBody).on("input",
	 * ".gb-optiondefinition-input-categoryname", function() {
	 * that.inputCategoryName(this); console.log(that.getStructure()); }); // 예제
	 * $(this.panelBody).on("change", ".gb-optiondefinition-select-geometry",
	 * function() { that.selectLayerGeometry(this);
	 * console.log(that.getStructure()); });
	 */

	// 속성 검수 코드 선택 이벤트
	$(this.panelBody).on("change", ".gb-optiondefinition-select-figurecode", function() {
		that.selectFigureCode(this);
		that.refreshFigureToFilterSelect(this);
		console.log(that.getStructure());
	});

	// 속성 검수 속성 필터 선택 이벤트
	$(this.panelBody).on("change", ".gb-optiondefinition-select-figuretofilter", function() {
		that.inputFigureKey(this);
		console.log(that.getStructure());
	});

	// 속성 검수 속성명 입력 이벤트
	$(this.panelBody).on("input", ".gb-optiondefinition-input-figurekey", function() {
		that.inputFigureKey(this);
		console.log(that.getStructure());
	});

	// 속성 검수 허용값 입력 이벤트
	$(this.panelBody).on("input", ".gb-optiondefinition-input-figurevalues", function() {
// that.inputFigureValues(this);
		that.inputFigureKey(this);
		console.log(that.getStructure());
	});

	// 속성 검수 수치값 입력 이벤트
	$(this.panelBody).on("input", ".gb-optiondefinition-input-figurenumber", function() {
// that.inputFigureNumber(this);
		that.inputFigureKey(this);
		console.log(that.getStructure());
	});

	// 속성 검수 조건 선택 이벤트
	$(this.panelBody).on("change", ".gb-optiondefinition-select-figurecondition", function() {
// that.selectFigureCondition(this);
		that.inputFigureKey(this);
		console.log(that.getStructure());
	});

	// 속성 검수 수치값 입력 이벤트
	$(this.panelBody).on("input", ".gb-optiondefinition-input-figureinterval", function() {
// that.inputFigureInterval(this);
		that.inputFigureKey(this);
		console.log(that.getStructure());
	});

	// 수치 조건 코드 선택 이벤트
	$(this.panelBody).on("change", ".gb-optiondefinition-select-tolerancecode", function() {
		that.selectToleranceCode(this);
		console.log(that.getStructure());
	});

	// 수치 조건 수치값 입력 이벤트
	$(this.panelBody).on("input", ".gb-optiondefinition-input-tolerancevalue", function() {
		that.inputToleranceValue(this);
		console.log(that.getStructure());
	});

	// 수치 조건 조건 선택 이벤트
	$(this.panelBody).on("change", ".gb-optiondefinition-select-tolerancecondition", function() {
		that.inputToleranceValue(this);
		console.log(that.getStructure());
	});

	// 수치 조건 간격 입력 이벤트
	$(this.panelBody).on("input", ".gb-optiondefinition-input-toleranceinterval", function() {
		that.inputToleranceValue(this);
		console.log(that.getStructure());
	});

	// 피규어 로우 삭제 버튼 클릭
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-deletefigurerow", function() {
		var thisBtn = this;
		var callback = function() {
			that.deleteFigureRow(thisBtn);
		};
		that.deleteConfirmModal("attr", callback);
		console.log(that.getStructure());
	});

	// 피규어 레이어 코드 삭제 버튼 클릭
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-deletelayerfigure", function() {
		var thisBtn = this;
		var callback = function() {
			that.deleteLayerCodeFigure(thisBtn);
		};
		that.deleteConfirmModal("code", callback);
		console.log(that.getStructure());
	});

	// 톨러런스 레이어 코드 삭제 버튼 클릭
	$(this.panelBody).on("click", ".gb-optiondefinition-btn-deletelayertolerance", function() {
		var thisBtn = this;
		var callback = function() {
			that.deleteLayerCodeTolerance(thisBtn);
		};
		that.deleteConfirmModal("code", callback);
		console.log(that.getStructure());
	});
	// 설정 화면 초기화
	this.init();
};
gb.validation.OptionDefinition.prototype = Object.create(gb.validation.OptionDefinition.prototype);
gb.validation.OptionDefinition.prototype.constructor = gb.validation.OptionDefinition;

/**
 * 설정화면을 초기화한다.
 * 
 * @method gb.validation.OptionDefinition#init
 */
gb.validation.OptionDefinition.prototype.init = function() {
	this.printCategory();
};

/**
 * 지정된 영역에 메세지를 표시한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#setMessagePopup
 * @param {string}
 *            type - 메세지의 종류(success, info, warning, danger)
 * @param {string}
 *            message - 메세지 본문
 */
gb.validation.OptionDefinition.prototype.setMessagePopup = function(type, message) {
	if (typeof type !== "string") {
		console.error("type must be string");
		return;
	}
	var alert = "alert-";
	switch (type) {
	case "success":
		alert = alert + "success";
		break;
	case "info":
		alert = alert + "info";
		break;
	case "warning":
		alert = alert + "warning";
		break;
	case "danger":
		alert = alert + "danger";
		break;
	default:
		alert = alert + "info";
	break;
	}
	var span = $("<span>").attr("aria-hidden", "true").html("&times;");
	var xbtn = $("<button>").addClass("close").attr("type", "button").attr("data-dismiss", "alert").attr("aria-label", "Close")
	.append(span);
	var head = $("<strong>").text(this.translation.notice[this.locale]);
	var div = $("<div>").addClass("alert").addClass(alert).addClass("alert-dismissible").attr("role", "alert").append(xbtn).append(head)
	.append(" " + message);
	$(this.msg).append(div);
};
/**
 * 레이어의 톨러런스 조건(컨디션, 수치 조건)을 삭제한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#deleteLayerCodeTolerance
 * @param {HTMLElement}
 *            btn - 삭제 버튼 객체
 */
gb.validation.OptionDefinition.prototype.deleteLayerCodeTolerance = function(btn) {
	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];
	// 레이어 엘리먼트
	var layerElem = $(btn).parents().eq(2);
	// 레이어 코드 인덱스
	var layerIdx = $(layerElem).index();

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var strc = this.getStructure();
	if (Array.isArray(strc["definition"])) {
		var isExist = false;
		// definition에서 현재 분류를 찾는다
		for (var i = 0; i < strc["definition"].length; i++) {
			if (strc["definition"][i]["name"] === this.nowCategory) {
				isExist = true;
				// options 키를 가지고 있는지?
				if (strc["definition"][i].hasOwnProperty("options")) {
					// 검수 타입이 설정 되어있는지
					if (strc["definition"][i]["options"].hasOwnProperty(type3) && !!strc["definition"][i]["options"][type3]) {
						// 해당 검수 항목이 설정되어 있는지
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								continue;
							}
							if (sec) {
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
									if (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"])) {
										var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
										for (var j = 0; j < rel.length; j++) {
											if (rel[j]["name"] === this.nowRelationCategory) {
												if (rel[j].hasOwnProperty("tolerance")) {
													if (Array.isArray(rel[j]["tolerance"])) {
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["tolerance"]
														.splice(layerIdx, 1);
														if (strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["tolerance"].length === 0) {
															delete strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["tolerance"];
														}
														var types = Object
														.keys(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]);
														if (types.length === 1) {
															strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"]
															.splice(j, 1);
															if (strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].length === 0) {
																delete strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
															}
														}
													}
												}
											}
										}
									}
								}
							} else {
								// filter 키가 설정되어있는지?
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("tolerance")) {
									var filter = strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"];
									if (Array.isArray(filter)) {
										strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"].splice(layerIdx, 1);
										// $(layerElem).remove();
										if (strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"].length === 0) {
											delete strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"];
										}
									}
								}
							}
							var optionKeys = Object.keys(strc["definition"][i]["options"][type3][this.nowOption.alias]);
							if (optionKeys.length === 0 || (optionKeys.length === 1 && optionKeys[0] === "run")) {
								delete strc["definition"][i]["options"][type3][this.nowOption.alias];
								var typeKeys = Object.keys(strc["definition"][i]["options"][type3]);
								if (typeKeys.length === 0 || (typeKeys.length === 1 && typeKeys[0] === "run")) {
									delete strc["definition"][i]["options"][type3];
									var keys = Object.keys(strc["definition"][i]["options"]);
									if (keys.length === 0) {
										strc["definition"].splice(layerIdx, 1);
									}
								}
							}
						}
					}
				}
			}
		}
		$(layerElem).remove();
	}
};
/**
 * 레이어의 피규어 조건(애트리뷰트, 속성 검수)을 삭제한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#deleteLayerCodeFigure
 * @param {HTMLElement}
 *            btn - 삭제 버튼 객체
 */
gb.validation.OptionDefinition.prototype.deleteLayerCodeFigure = function(btn) {
	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];
	// 레이어 엘리먼트
	var layerElem = $(btn).parents().eq(2);
	// 레이어 코드 인덱스
	var layerIdx = $(layerElem).index();

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var strc = this.getStructure();
	if (Array.isArray(strc["definition"])) {
		var isExist = false;
		// definition에서 현재 분류를 찾는다
		for (var i = 0; i < strc["definition"].length; i++) {
			if (strc["definition"][i]["name"] === this.nowCategory) {
				isExist = true;
				// options 키를 가지고 있는지?
				if (strc["definition"][i].hasOwnProperty("options") && !!strc["definition"][i]["options"]) {
					// 검수 타입이 설정 되어있는지
					if (strc["definition"][i]["options"].hasOwnProperty(type3) && !!strc["definition"][i]["options"][type3]) {
						// 해당 검수 항목이 설정되어 있는지
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								continue;
							}
							if (sec) {
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
									if (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"])) {
										var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
										for (var j = 0; j < rel.length; j++) {
											if (rel[j]["name"] === this.nowRelationCategory) {
												if (rel[j].hasOwnProperty("figure")) {
													if (Array.isArray(rel[j]["figure"])) {
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["figure"]
														.splice(layerIdx, 1);
														if (strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["figure"].length === 0) {
															delete strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["figure"];
														}
														var types = Object
														.keys(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]);
														if (types.length === 1) {
															strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"]
															.splice(j, 1);
															if (strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].length === 0) {
																delete strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
															}
														}
													}
												}
											}
										}
									}
								}
							} else {
								// filter 키가 설정되어있는지?
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("figure")) {
									var filter = strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"];
									if (Array.isArray(filter)) {
										strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"].splice(layerIdx, 1);
										// $(layerElem).remove();
										if (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"].length === 0) {
											delete strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"];
										}
									}
								}
							}
							var optionKeys = Object.keys(strc["definition"][i]["options"][type3][this.nowOption.alias]);
							if (optionKeys.length === 0 || (optionKeys.length === 1 && optionKeys[0] === "run")) {
								delete strc["definition"][i]["options"][type3][this.nowOption.alias];
								var typeKeys = Object.keys(strc["definition"][i]["options"][type3]);
								if (typeKeys.length === 0 || (typeKeys.length === 1 && typeKeys[0] === "run")) {
									delete strc["definition"][i]["options"][type3];
									var keys = Object.keys(strc["definition"][i]["options"]);
									if (keys.length === 0) {
										strc["definition"].splice(layerIdx, 1);
									}
								}
							}
						}
					}
				}
			}
		}
		$(layerElem).remove();
	}
};
/**
 * 레이어의 피규어 조건을 삭제한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#deleteFigureRow
 * @param {HTMLElement}
 *            btn - 삭제 버튼 객체
 */
gb.validation.OptionDefinition.prototype.deleteFigureRow = function(btn) {
	// 필터 엘리먼트
	var filterElem = $(btn).parents().eq(2);
	// 필터 인덱스
	var filterIdx = $(filterElem).index();
	// 레이어 인덱스
	var layerIdx = $(btn).parents().eq(5).index();

	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var strc = this.getStructure();
	if (Array.isArray(strc["definition"])) {
		var isExist = false;
		// definition에서 현재 분류를 찾는다
		for (var i = 0; i < strc["definition"].length; i++) {
			if (strc["definition"][i]["name"] === this.nowCategory) {
				isExist = true;
				// options 키를 가지고 있는지?
				if (strc["definition"][i].hasOwnProperty("options") && !!strc["definition"][i]["options"]) {
					// 검수 타입이 설정 되어있는지
					if (strc["definition"][i]["options"].hasOwnProperty(type3) && !!strc["definition"][i]["options"][type3]) {
						// 해당 검수 항목이 설정되어 있는지
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								continue;
							}
							if (sec) {
								// relation 키가 설정되어 있는지?
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
									var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
									// relation이 배열인지?
									if (Array.isArray(rel)) {
										for (var j = 0; j < rel.length; j++) {
											if (rel[j]["name"] === this.nowRelationCategory) {
												if (rel[j].hasOwnProperty("figure")) {
													if (Array.isArray(rel[j]["figure"])) {
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["figure"][layerIdx]["attribute"]
														.splice(filterIdx, 1);
													}
												}
											}
										}
									}
								}
							} else {
								// filter 키가 설정되어있는지?
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("figure")) {
									if (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"])) {
										// filter키가 배열형태임
										var attr = strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"];
										if (Array.isArray(attr)) {
											strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"]
											.splice(filterIdx, 1);
										}
									}
								}
							}
						}
					}
				}
			}
		}
		$(filterElem).remove();
	}
};
/**
 * 톨러런스 조건의 간격값을 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#inputToleranceInterval
 * @param {HTMLElement}
 *            inp - 값 입력 폼 객체
 */
gb.validation.OptionDefinition.prototype.inputToleranceInterval = function(inp) {
	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];
	// 필터 인덱스
	var filterIdx = $(inp).parents().eq(1).index();
	// 레이어 인덱스
	var layerIdx = $(inp).parents().eq(4).index();
	// 레이어 코드
	var layerCode = null;
	if (!$(inp).parents().eq(4).find(".gb-optiondefinition-select-tolerancecode").prop("disabled")) {
		layerCode = $(inp).parents().eq(4).find(".gb-optiondefinition-select-tolerancecode option").filter(":selected").attr("geom") === "none" ? null
				: $(inp).parents().eq(4).find(".gb-optiondefinition-select-tolerancecode").val();
	}

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var strc = this.getStructure();
	if (Array.isArray(strc["definition"])) {
		var isExist = false;
		// definition에서 현재 분류를 찾는다
		for (var i = 0; i < strc["definition"].length; i++) {
			if (strc["definition"][i]["name"] === this.nowCategory) {
				isExist = true;
				// options 키를 가지고 있는지?
				if (!strc["definition"][i].hasOwnProperty("options")) {
					strc["definition"][i]["options"] = {};
				}
				// 검수 타입이 설정 되어있는지
				if (!strc["definition"][i]["options"].hasOwnProperty(type3)) {
					strc["definition"][i]["options"][type3] = {}; 
				}
				// 해당 검수 항목이 설정되어 있는지
				if (!strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
					strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
				}
				// 현재 입력한 값이 릴레이션 필터 값인지?
				if (sec) {
					// 현재 옵션에 릴레이션 키가 있는지?
					if (!strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
						strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [];
					}
					// 있다면
					// 배열인지?
					if (!Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"])) {
						strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [];
					}
					var isExist = false;
					var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
					for (var a = 0; a < rel.length; a++) {
						// 필터키 안에 분류 이름이 현재 릴레이션 분류 이름과 같다면
						if (rel[a]["name"] === this.nowRelationCategory) {
							isExist = true;
							var filterKey;
							if (!rel[a].hasOwnProperty("tolerance")) {
								rel[a]["tolerance"] = [];
							}
							filterKey = rel[a]["tolerance"];
							// 톨러런스 키가 배열인지?
							if (!Array.isArray(filterKey)) {
								rel[a]["tolerance"] = [];
							}
							// tolerance키가 배열형태임
							var tup = $(inp).parents().eq(5);
							var wells = $(tup).find(".well");
							for (var b = 0; b < wells.length; b++) {
								var code = $(wells[b]).find(".gb-optiondefinition-select-tolerancecode").val();
								if ($(wells[a]).find(".gb-optiondefinition-select-tolerancecode").children('option').filter("option:selected").attr("geom") === "none") {
									code = null;
								}
								var value = !$(wells[b]).find(".gb-optiondefinition-input-tolerancevalue").prop("disabled") ? !isNaN(parseFloat($(wells[b]).find(".gb-optiondefinition-input-tolerancevalue").val())) ? parseFloat($(wells[b]).find(".gb-optiondefinition-input-tolerancevalue").val()) : null : null;
								var cond = !$(wells[b]).find(".gb-optiondefinition-select-tolerancecondition").prop("disabled") ? $(wells[b]).find(".gb-optiondefinition-select-tolerancecondition").val() : null;
								var inter = !$(wells[b]).find(".gb-optiondefinition-input-toleranceinterval").prop("disabled") ? !isNaN(parseFloat($(wells[b]).find(".gb-optiondefinition-input-toleranceinterval").val())) ? parseFloat($(wells[b]).find(".gb-optiondefinition-input-toleranceinterval").val()) : null : null;
								rel[a]["tolerance"][b] = {
										"code" : code,
										"value" : value,
										"condition" : typeof cond === "string" ? cond : null,
												"interval" : inter
								};
							}
						}
					}
					if (!isExist) {
						var codeElem = {
								"code" : layerCode,
								"value" : number !== "" ? number : null,
										"condition" : typeof condition === "string" ? condition : null,
												"interval" : isNaN(interval) ? null : interval
						};
						var nameElem = {
								"name" : this.nowRelationCategory,
								"tolerance" : [ codeElem ]
						};
						strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
					}
					// 여기까지 릴레이션
				} else {
					// filter 키가 설정되어있는지?
					if (!strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("tolerance")) {
						strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"] = [];
					}
					if (!Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"])) {
						strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"] = [];
					}
					// tolerance키가 배열형태임
					var tup = $(inp).parents().eq(5);
					var wells = $(tup).find(".well");
					for (var a = 0; a < wells.length; a++) {
						var code = $(wells[a]).find(".gb-optiondefinition-select-tolerancecode").val();
						if ($(wells[a]).find(".gb-optiondefinition-select-tolerancecode").children('option').filter("option:selected").attr("geom") === "none") {
							code = null;
						}
						var value = !$(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").prop("disabled") ? !isNaN(parseFloat($(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").val())) ? parseFloat($(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").val()) : null : null;
						var cond = !$(wells[a]).find(".gb-optiondefinition-select-tolerancecondition").prop("disabled") ? $(wells[a]).find(".gb-optiondefinition-select-tolerancecondition").val() : null;
						var inter = !$(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").prop("disabled") ? !isNaN(parseFloat($(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").val())) ? parseFloat($(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").val()) : null : null;
						strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"][a] = {
								"code" : code,
								"value" : value,
								"condition" : typeof cond === "string" ? cond : null,
										"interval" : inter
						};
					}
				}
			}
		}
		// 정의에 해당 분류가 없음
		if (!isExist) {
			// 릴레이션 설정임
			if (sec) {
				// 해당 검수 타입이 설정되어 있지 않음
				// 허용값이 입력되어있다면 값 변경
				var obj = {
						"code" : layerCode,
						"value" : number !== "" ? number : null,
								"condition" : typeof condition === "string" ? condition : null,
										"interval" : isNaN(interval) ? null : interval
				};
				var optionsObj = [ {
					"name" : this.nowRelationCategory,
					"tolerance" : [ obj ]
				} ];

				var typeObj = {};
				typeObj[type3] = {};
				typeObj[type3][this.nowOption.alias] = {};
				typeObj[type3][this.nowOption.alias]["relation"] = optionsObj;

				var definitionObj = {
						"name" : this.nowCategory,
						"options" : typeObj
				};
				this.getStructure()["definition"].push(definitionObj);
			} else {
				// 릴레이션 설정 아님
				// 해당 검수 타입이 설정되어 있지 않음
				// 허용값이 입력되어있다면 값 변경

				var optionsObj = {
						"tolerance" : []
				};
				var typeObj = {};
				typeObj[type3] = {};
				typeObj[type3][this.nowOption.alias] = optionsObj;

				// tolerance키가 배열형태임
				var tup = $(inp).parents().eq(5);
				var wells = $(tup).find(".well");
				for (var a = 0; a < wells.length; a++) {
					var code = $(wells[a]).find(".gb-optiondefinition-select-tolerancecode").val();
					if ($(wells[a]).find(".gb-optiondefinition-select-tolerancecode").children('option').filter("option:selected").attr("geom") === "none") {
						code = null;
					}
					var value = !$(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").prop("disabled") ? !isNaN(parseFloat($(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").val())) ? parseFloat($(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").val()) : null : null;
					var cond = !$(wells[a]).find(".gb-optiondefinition-select-tolerancecondition").prop("disabled") ? $(wells[a]).find(".gb-optiondefinition-select-tolerancecondition").val() : null;
					var inter = !$(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").prop("disabled") ? !isNaN(parseFloat($(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").val())) ? parseFloat($(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").val()) : null : null;
					optionsObj["tolerance"][a] = {
							"code" : code,
							"value" : value,
							"condition" : typeof cond === "string" ? cond : null,
									"interval" : inter
					};
				}

				var definitionObj = {
						"name" : this.nowCategory,
						"options" : typeObj
				};
				this.getStructure()["definition"].push(definitionObj);
			}
		}
	}
};
/**
 * 레이어의 톨러런스 조건의 비교 조건을 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#selectToleranceCondition
 * @param {HTMLElement}
 *            sel - 비교 조건 입력 폼 객체
 */
gb.validation.OptionDefinition.prototype.selectToleranceCondition = function(sel) {
	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];
	// 필터 인덱스
	var filterIdx = $(sel).parents().eq(1).index();
	// 레이어 인덱스
	var layerIdx = $(sel).parents().eq(4).index();
	// 레이어 코드
	var layerCode = null;
	if (!$(sel).parents().eq(4).find(".gb-optiondefinition-select-tolerancecode").prop("disabled")) {
		layerCode = $(sel).parents().eq(4).find(".gb-optiondefinition-select-tolerancecode option").filter(":selected").attr("geom") === "none" ? null
				: $(sel).parents().eq(4).find(".gb-optiondefinition-select-tolerancecode").val();
	}
	// 수치
	var number = null;
	if (!$(sel).parents().eq(1).find(".gb-optiondefinition-input-tolerancevalue").prop("disabled")) {
		var temp = parseFloat($(sel).parents().eq(1).find(".gb-optiondefinition-input-tolerancevalue").val());
		if (!isNaN(temp)) {
			number = parseFloat($(sel).parents().eq(1).find(".gb-optiondefinition-input-tolerancevalue").val());
		}
	}
	// 조건
	var condition = $(sel).val();
	if (!$(sel).prop("disabled")) {
		condition = $(sel).val();
	}
	// 간격
	var interval = parseFloat($(sel).parents().eq(1).find(".gb-optiondefinition-input-toleranceinterval").val());
	if (!$(sel).parents().eq(1).find(".gb-optiondefinition-input-toleranceinterval").prop("disabled")) {
		interval = parseFloat($(sel).parents().eq(1).find(".gb-optiondefinition-input-toleranceinterval").val());
	}

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var strc = this.getStructure();
	if (Array.isArray(strc["definition"])) {
		var isExist = false;
		// definition에서 현재 분류를 찾는다
		for (var i = 0; i < strc["definition"].length; i++) {
			if (strc["definition"][i]["name"] === this.nowCategory) {
				isExist = true;
				// options 키를 가지고 있는지?
				if (strc["definition"][i].hasOwnProperty("options") && !!strc["definition"][i]["options"]) {
					// 검수 타입이 설정 되어있는지
					if (strc["definition"][i]["options"].hasOwnProperty(type3) && !!strc["definition"][i]["options"][type3]) {
						// 해당 검수 항목이 설정되어 있는지
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								continue;
							}
							// 현재 입력한 값이 릴레이션 필터 값인지?
							if (sec) {
								// 현재 옵션에 릴레이션 키가 있는지?
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
									// 있다면
									// 배열인지?
									if (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"])) {
										var isExist = false;
										var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
										for (var a = 0; a < rel.length; a++) {
											// 필터키 안에 분류 이름이 현재 릴레이션 분류 이름과 같다면
											if (rel[a]["name"] === this.nowRelationCategory) {
												isExist = true;
												var filterKey;
												if (rel[a].hasOwnProperty("tolerance")) {
													filterKey = rel[a]["tolerance"];
													// 톨러런스 키가 배열인지?
													if (Array.isArray(filterKey)) {
														// 필터 배열 원소에 attribute
														// 키가 있는지?
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["tolerance"][layerIdx] = {
																"code" : layerCode,
																"value" : number !== "" ? number : null,
																		"condition" : typeof condition === "string" ? condition : null,
																				"interval" : isNaN(interval) ? null : interval
														};
													} else {
														// 톨러런스 키가 배열이 아니라면
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["tolerance"] = [ {
															"code" : layerCode,
															"value" : number !== "" ? number : null,
																	"condition" : typeof condition === "string" ? condition : null,
																			"interval" : isNaN(interval) ? null : interval
														} ];
													}
												}
											}
										}
										if (!isExist) {
											var codeElem = {
													"code" : layerCode,
													"value" : number !== "" ? number : null,
															"condition" : typeof condition === "string" ? condition : null,
																	"interval" : isNaN(interval) ? null : interval
											};
											var nameElem = {
													"name" : this.nowRelationCategory,
													"tolerance" : [ codeElem ]
											};
											strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
										}
									} else {
										// 배열이 아니라면
										var codeElem = {
												"code" : layerCode,
												"value" : number !== "" ? number : null,
														"condition" : typeof condition === "string" ? condition : null,
																"interval" : isNaN(interval) ? null : interval
										};
										var nameElem = {
												"name" : this.nowRelationCategory,
												"tolerance" : [ codeElem ]
										};
										strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
									}
								} else {
									// 현재 옵션에 릴레이션 키가
									// 없다면
									var codeElem = {
											"code" : layerCode,
											"value" : number !== "" ? number : null,
													"condition" : typeof condition === "string" ? condition : null,
															"interval" : isNaN(interval) ? null : interval
									};
									var nameElem = {
											"name" : this.nowRelationCategory,
											"tolerance" : [ codeElem ]
									};
									strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [ nameElem ];
								}
								// 여기까지 릴레이션
							} else {
								// filter 키가 설정되어있는지?
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("tolerance")) {
									if (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"])) {
										// tolerance키가 배열형태임
										var tup = $(sel).parents().eq(5);
										var wells = $(tup).find(".well");
										for (var a = 0; a < wells.length; a++) {
											var code = $(wells[a]).find(".gb-optiondefinition-select-tolerancecode").val();
											if ($(wells[a]).find(".gb-optiondefinition-select-tolerancecode").children('option').filter("option:selected").attr("geom") === "none") {
												code = null;
											}
											var value = !isNaN(parseFloat($(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").val())) ? parseFloat($(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").val()) : null;
											var cond = $(wells[a]).find(".gb-optiondefinition-select-tolerancecondition").val();
											var inter = !isNaN(parseFloat($(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").val())) ? parseFloat($(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").val()) : null;
											strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"][a] = {
													"code" : code,
													"value" : value,
													"condition" : typeof cond === "string" ? cond : null,
															"interval" : inter
											};
										}
									} else {
										// filter키가 배열형태가 아님
										// 허용값이 입력되어있다면 값 변경 / 값은 위에 변수에 할당되어있음
										var obj = {
												"code" : layerCode,
												"value" : number !== "" ? number : null,
														"condition" : typeof condition === "string" ? condition : null,
																"interval" : isNaN(interval) ? null : interval
										};
										strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"] = [ obj ];
									}
								} else {
									// filter 키가 설정되어있지 않음
									// 허용값이 입력되어있다면 값 변경
									var obj = {
											"code" : layerCode,
											"value" : number !== "" ? number : null,
													"condition" : typeof condition === "string" ? condition : null,
															"interval" : isNaN(interval) ? null : interval
									};
									strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"] = [ obj ];
								}
							}
						} else {
							// 해당 검수항목이 설정되어 있지 않음
							// 릴레이션임
							if (sec) {
								// 없다면
								var codeElem = {
										"code" : layerCode,
										"value" : number !== "" ? number : null,
												"condition" : typeof condition === "string" ? condition : null,
														"interval" : isNaN(interval) ? null : interval
								};
								var nameElem = {
										"name" : this.nowRelationCategory,
										"tolerance" : [ codeElem ]
								};
								strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
								strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [ nameElem ];
							} else {
								// 해당 검수 항목이 설정되어 있지 않음
								var obj = {
										"code" : layerCode,
										"value" : number !== "" ? number : null,
												"condition" : typeof condition === "string" ? condition : null,
														"interval" : isNaN(interval) ? null : interval
								};
								var optionObj = {
										"tolerance" : [ obj ]
								};
								strc["definition"][i]["options"][type3][this.nowOption.alias] = optionObj;
							}
						}
					} else {
						// 해당 검수 타입이 설정되어 있지 않음
						if (sec) {
							var codeElem = {
									"code" : layerCode,
									"value" : number !== "" ? number : null,
											"condition" : typeof condition === "string" ? condition : null,
													"interval" : isNaN(interval) ? null : interval
							};
							var nameElem = {
									"name" : this.nowRelationCategory,
									"tolerance" : [ codeElem ]
							};
							strc["definition"][i]["options"][type3] = {};
							strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
							strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [ nameElem ];

							strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [ obj ];
						} else {
							var obj = {
									"code" : layerCode,
									"value" : number !== "" ? number : null,
											"condition" : typeof condition === "string" ? condition : null,
													"interval" : isNaN(interval) ? null : interval
							};
							var optionObj = {
									"tolerance" : [ obj ]
							};
							var typeObj = {};
							typeObj[this.nowOption.alias] = optionObj;
							strc["definition"][i]["options"][type3] = typeObj;
						}
					}
				}
			}
		}
		// 정의에 해당 분류가 없음
		if (!isExist) {
			// 릴레이션 설정임
			if (sec) {
				// 해당 검수 타입이 설정되어 있지 않음
				// 허용값이 입력되어있다면 값 변경
				var obj = {
						"code" : layerCode,
						"value" : number !== "" ? number : null,
								"condition" : typeof condition === "string" ? condition : null,
										"interval" : isNaN(interval) ? null : interval
				};
				var optionsObj = [ {
					"name" : this.nowRelationCategory,
					"tolerance" : [ obj ]
				} ];

				var typeObj = {};
				typeObj[type3] = {};
				typeObj[type3][this.nowOption.alias] = {};
				typeObj[type3][this.nowOption.alias]["relation"] = optionsObj;

				var definitionObj = {
						"name" : this.nowCategory,
						"options" : typeObj
				};
				this.getStructure()["definition"].push(definitionObj);
			} else {
				// 릴레이션 설정 아님
				// 해당 검수 타입이 설정되어 있지 않음
				// 허용값이 입력되어있다면 값 변경
				var obj = {
						"code" : layerCode,
						"value" : number !== "" ? number : null,
								"condition" : typeof condition === "string" ? condition : null,
										"interval" : isNaN(interval) ? null : interval
				};
				var optionsObj = {
						"tolerance" : [ obj ]
				};
				var typeObj = {};
				typeObj[type3] = {};
				typeObj[type3][this.nowOption.alias] = optionsObj;

				var definitionObj = {
						"name" : this.nowCategory,
						"options" : typeObj
				};
				this.getStructure()["definition"].push(definitionObj);
			}
		}
	}
};
/**
 * 톨러런스 조건의 기준값을 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#inputToleranceValue
 * @param {HTMLElement}
 *            inp - 기준값 입력 폼 객체
 */
gb.validation.OptionDefinition.prototype.inputToleranceValue = function(inp) {
	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];
	// 필터 인덱스
	var filterIdx = $(inp).parents().eq(1).index();
	// 레이어 인덱스
	var layerIdx = $(inp).parents().eq(4).index();
	// 레이어 코드
	var layerCode = null;
	if (!$(inp).parents().eq(4).find(".gb-optiondefinition-select-tolerancecode").prop("disabled")) {
		layerCode = $(inp).parents().eq(4).find(".gb-optiondefinition-select-tolerancecode option").filter(":selected").attr("geom") === "none" ? null
				: $(inp).parents().eq(4).find(".gb-optiondefinition-select-tolerancecode").val();
	}

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var strc = this.getStructure();
	if (Array.isArray(strc["definition"])) {
		var isExist = false;
		// definition에서 현재 분류를 찾는다
		for (var i = 0; i < strc["definition"].length; i++) {
			if (strc["definition"][i]["name"] === this.nowCategory) {
				isExist = true;
				// options 키를 가지고 있는지?
				if (!strc["definition"][i].hasOwnProperty("options")) {
					strc["definition"][i]["options"] = {};
				}
				// 검수 타입이 설정 되어있는지
				if (!strc["definition"][i]["options"].hasOwnProperty(type3)) {
					strc["definition"][i]["options"][type3] = {};
					strc["definition"][i]["options"][type3]["run"] = true;
				}
				// 해당 검수 항목이 설정되어 있는지
				if (!strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
					strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
					strc["definition"][i]["options"][type3][this.nowOption.alias]["run"] = true;
				}
				// 현재 입력한 값이 릴레이션 필터 값인지?
				if (sec) {
					// 현재 옵션에 릴레이션 키가 있는지?
					if (!strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
						strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [];
					}
					// 있다면
					// 배열인지?
					if (!Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"])) {
						strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [];
					}
					var isExist = false;
					var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
					for (var a = 0; a < rel.length; a++) {
						// 필터키 안에 분류 이름이 현재 릴레이션 분류 이름과 같다면
						if (rel[a]["name"] === this.nowRelationCategory) {
							isExist = true;
							var filterKey;
							if (!rel[a].hasOwnProperty("tolerance")) {
								rel[a]["tolerance"] = [];
							}
							filterKey = rel[a]["tolerance"];
							// 톨러런스 키가 배열인지?
							if (!Array.isArray(filterKey)) {
								rel[a]["tolerance"] = [];
							}
							// tolerance키가 배열형태임
							var tup = $(inp).parents().eq(5);
							var wells = $(tup).find(".well");
							for (var b = 0; b < wells.length; b++) {
								var code = $(wells[b]).find(".gb-optiondefinition-select-tolerancecode").val();
								if ($(wells[a]).find(".gb-optiondefinition-select-tolerancecode").children('option').filter("option:selected").attr("geom") === "none") {
									code = null;
								}
								var value = !$(wells[b]).find(".gb-optiondefinition-input-tolerancevalue").prop("disabled") ? !isNaN(parseFloat($(wells[b]).find(".gb-optiondefinition-input-tolerancevalue").val())) ? parseFloat($(wells[b]).find(".gb-optiondefinition-input-tolerancevalue").val()) : null : null;
								var cond = !$(wells[b]).find(".gb-optiondefinition-select-tolerancecondition").prop("disabled") ? $(wells[b]).find(".gb-optiondefinition-select-tolerancecondition").val() : null;
								var inter = !$(wells[b]).find(".gb-optiondefinition-input-toleranceinterval").prop("disabled") ? !isNaN(parseFloat($(wells[b]).find(".gb-optiondefinition-input-toleranceinterval").val())) ? parseFloat($(wells[b]).find(".gb-optiondefinition-input-toleranceinterval").val()) : null : null;
								rel[a]["tolerance"][b] = {
										"code" : code,
										"value" : value,
										"condition" : typeof cond === "string" ? cond === "null" ? null : cond : null,
												"interval" : inter
								};
							}
						}
					}
					if (!isExist) {
						var codeElem = {
								"code" : layerCode,
								"value" : number !== "" ? number : null,
										"condition" : typeof condition === "string" ? condition : null,
												"interval" : isNaN(interval) ? null : interval
						};
						var nameElem = {
								"name" : this.nowRelationCategory,
								"tolerance" : [ codeElem ]
						};
						strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
					}
					// 여기까지 릴레이션
				} else {
					// filter 키가 설정되어있는지?
					if (!strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("tolerance")) {
						strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"] = [];
					}
					if (!Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"])) {
						strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"] = [];
					}
					// tolerance키가 배열형태임
					var tup = $(inp).parents().eq(5);
					var wells = $(tup).find(".well");
					for (var a = 0; a < wells.length; a++) {
						var code = $(wells[a]).find(".gb-optiondefinition-select-tolerancecode").val();
						if ($(wells[a]).find(".gb-optiondefinition-select-tolerancecode").children('option').filter("option:selected").attr("geom") === "none") {
							code = null;
						}
						var value = !$(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").prop("disabled") ? !isNaN(parseFloat($(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").val())) ? parseFloat($(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").val()) : null : null;
						var cond = !$(wells[a]).find(".gb-optiondefinition-select-tolerancecondition").prop("disabled") ? $(wells[a]).find(".gb-optiondefinition-select-tolerancecondition").val() : null;
						var inter = !$(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").prop("disabled") ? !isNaN(parseFloat($(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").val())) ? parseFloat($(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").val()) : null : null;
						strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"][a] = {
								"code" : code,
								"value" : value,
								"condition" : typeof cond === "string" ? cond === "null" ? null : cond : null,
										"interval" : inter
						};
					}
				}
			}
		}
		// 정의에 해당 분류가 없음
		if (!isExist) {
			// 릴레이션 설정임
			if (sec) {
				// 해당 검수 타입이 설정되어 있지 않음
				// 허용값이 입력되어있다면 값 변경
				var obj = {
						"code" : layerCode,
						"value" : number !== "" ? number : null,
								"condition" : typeof condition === "string" ? condition : null,
										"interval" : isNaN(interval) ? null : interval
				};
				var optionsObj = [ {
					"name" : this.nowRelationCategory,
					"tolerance" : [ obj ]
				} ];

				var typeObj = {};
				typeObj[type3] = {};
				typeObj[type3]["run"] = true;
				typeObj[type3][this.nowOption.alias] = {};
				typeObj[type3][this.nowOption.alias]["run"] = true;
				typeObj[type3][this.nowOption.alias]["relation"] = optionsObj;

				var definitionObj = {
						"name" : this.nowCategory,
						"options" : typeObj
				};
				this.getStructure()["definition"].push(definitionObj);
			} else {
				// 릴레이션 설정 아님
				// 해당 검수 타입이 설정되어 있지 않음
				// 허용값이 입력되어있다면 값 변경

				var optionsObj = {
						"run" : true,
						"tolerance" : []
				};
				var typeObj = {};
				typeObj[type3] = {};
				typeObj[type3]["run"] = true;
				typeObj[type3][this.nowOption.alias] = optionsObj;

				// tolerance키가 배열형태임
				var tup = $(inp).parents().eq(5);
				var wells = $(tup).find(".well");
				for (var a = 0; a < wells.length; a++) {
					var code = $(wells[a]).find(".gb-optiondefinition-select-tolerancecode").val();
					if ($(wells[a]).find(".gb-optiondefinition-select-tolerancecode").children('option').filter("option:selected").attr("geom") === "none") {
						code = null;
					}
					var value = !$(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").prop("disabled") ? !isNaN(parseFloat($(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").val())) ? parseFloat($(wells[a]).find(".gb-optiondefinition-input-tolerancevalue").val()) : null : null;
					var cond = !$(wells[a]).find(".gb-optiondefinition-select-tolerancecondition").prop("disabled") ? $(wells[a]).find(".gb-optiondefinition-select-tolerancecondition").val() : null;
					var inter = !$(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").prop("disabled") ? !isNaN(parseFloat($(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").val())) ? parseFloat($(wells[a]).find(".gb-optiondefinition-input-toleranceinterval").val()) : null : null;
					optionsObj["tolerance"][a] = {
							"code" : code,
							"value" : value,
							"condition" : typeof cond === "string" ? cond === "null" ? null : cond : null,
									"interval" : inter
					};
				}

				var definitionObj = {
						"name" : this.nowCategory,
						"options" : typeObj
				};
				this.getStructure()["definition"].push(definitionObj);
			}
		}
	}
};
/**
 * 톨러런스 조건의 릴레이션 레이어를 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#selectToleranceCode
 * @param {HTMLElement}
 *            sel - 레이어 선택 폼 객체
 */
gb.validation.OptionDefinition.prototype.selectToleranceCode = function(sel) {
	var nowOption = this.optItem[this.nowOption.alias];
	if (nowOption === undefined) {
		return;
	}

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	// 레이어 인덱스
	var layerIdx = $(sel).parents().eq(2).index();
	// 코드 중복 상태
	var duplicatedOpt = {};
	// 레이어 코드 필터 영역
	var tup = $(sel).parents().eq(3);
	// 선택된 모든 레이어 코드 셀렉트 옵션
	var selectedCode = $(tup).find(".gb-optiondefinition-select-tolerancecode");
	var firstSelect = selectedCode[0];
	if (firstSelect !== undefined) {
		var allCode = $(firstSelect).find("option");
		for (var i = 0; i < allCode.length; i++) {
			duplicatedOpt[$(allCode[i]).text()] = false;
		}
	}

	// 추가한 코드들
	var well = $(tup).find(".well");
	// 지금 선택한게 중복인지
	var isExist = false;
	// 모든 웰을 돌면서
	for (var i = 0; i < well.length; i++) {
		// 현재 셀렉트 박스는 재끼고
		if (i === layerIdx) {
			continue;
		}
		var selec = $(well[i]).find(".gb-optiondefinition-select-tolerancecode");
		duplicatedOpt[$(selec).val()] = true;
	}

	if ((duplicatedOpt[$(sel).val()]) || (well.length > 1 && $(sel).find("option:selected").attr("geom") === "none")) {
		var codeKeys = Object.keys(duplicatedOpt);
		for (var i = 0; i < codeKeys.length; i++) {
			if (!duplicatedOpt[codeKeys[i]]) {
				this.setMessagePopup("danger", this.translation.nomoreadd[this.locale]);
				$(sel).val(codeKeys[i]);
				$(sel).trigger("change");
				return;
			}
		}
	}

	// 레이어 인덱스
	var layerIdx = $(sel).parents().eq(2).index();
	// 레이어 코드
	var layerCode = $(sel).find("option:selected").attr("geom") === "none" ? null : $(sel).val();
	// 수치
	var number = null;
	if (!$(sel).parents().eq(2).find(".gb-optiondefinition-input-tolerancevalue").prop("disabled")) {
		var temp = parseFloat($(sel).parents().eq(2).find(".gb-optiondefinition-input-tolerancevalue").val());
		if (!isNaN(temp)) {
			number = parseFloat($(sel).parents().eq(2).find(".gb-optiondefinition-input-tolerancevalue").val());
		}
	}
	// 조건
	var condition = null;
	if (!$(sel).parents().eq(2).find(".gb-optiondefinition-select-tolerancecondition").prop("disabled")) {
		condition = $(sel).parents().eq(2).find(".gb-optiondefinition-select-tolerancecondition").val();
	}
	// 간격
	var interval = null;
	if (!$(sel).parents().eq(2).find(".gb-optiondefinition-input-toleranceinterval").prop("disabled")) {
		var temp = parseFloat($(sel).parents().eq(2).find(".gb-optiondefinition-input-toleranceinterval").val());
		if (!isNaN(temp)) {
			interval = temp;
		}
	}
	// 검수 항목 정보
	var optItem = this.optItem[this.nowOption.alias];
	// 검수 타입
	var type3 = optItem["purpose"];
	// 현재 코드에 설정된 필터 갯수
	var figures = $(sel).parents().eq(2).find(".gb-optiondefinition-tolerancearea").children();
	// 현재 레이어코드에 필터가 있는지?
	if (figures.length > 0) {
		var strc = this.getStructure();
		if (Array.isArray(strc["definition"])) {
			var isExist = false;
			for (var i = 0; i < strc["definition"].length; i++) {
				// 현재 검수 옵션에 현재 분류가 있는지?
				if (this.nowCategory === strc["definition"][i].name) {
					isExist = true;
					// 검수 옵션에 현재 타입 키가 있는지 애트리뷰트, 그래픽..
					if (strc["definition"][i]["options"].hasOwnProperty(type3) && !!strc["definition"][i]["options"][type3]) {
						// 현재 검수 항목이 들어있는지?
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								continue;
							}
							console.log("현재 레이어 코드:" + $(sel).val());
							// 릴레이션 레이어 필터일때
							if (sec) {
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
									var relation = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
									if (Array.isArray(relation)) {
										for (var j = 0; j < relation.length; j++) {
											if (relation[j].name === this.nowRelationCategory) {
												// 필터키를 가지고 있는지?
												if (relation[j].hasOwnProperty("tolerance")) {
													if (Array.isArray(relation[j]["tolerance"])) {
														var tolerElem = relation[j]["tolerance"][layerIdx];
														if (tolerElem !== undefined) {
// if (tolerElem.hasOwnProperty("code")) {
															relation[j]["tolerance"][layerIdx]["code"] = layerCode
// }
														} else {
															relation[j]["tolerance"][layerIdx] = {
																	"code" : layerCode,
																	"value" : number,
																	"condition" : condition,
																	"interval" : interval
															};
														}
														/*
														 * for (var k = 0; k <
														 * relation[j]["tolerance"].length;
														 * k++) { // 코드 키를 가지고
														 * 있는지? if
														 * (relation[j]["tolerance"][k].hasOwnProperty("code")) {
														 * relation[j]["tolerance"][k]["code"] =
														 * layerCode; } else { //
														 * 코드 키를 가지고 있지 // 않다면 } }
														 */
													}
												} else {
													// 필터키를 가지고 있지 않다면
													relation[j]["tolerance"] = [];
													relation[j]["tolerance"][layerIdx] = {
															"code" : layerCode,
															"value" : number,
															"condition" : condition,
															"interval" : interval
													};
												}
											}
										}
									}
								}
							} else {
								// 그냥 레이어 필터일때
								// 필터 키가 들어있는지
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("tolerance")) {
									var figures = strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"];
									if (Array.isArray(figures)) {
										if (figures[layerIdx] !== undefined) {
											strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"][layerIdx] = {
													"code" : layerCode,
													"value" : number,
													"condition" : condition,
													"interval" : interval
											};
										}
									}
								}
							}
						} else {
							// 검수 항목이 없음
							if (sec) {
								strc["definition"][i]["options"][type3][this.nowOption.alias] = {
										"relation" : []
								};
								var obj = {
										"name" : this.nowRelationCategory,
										"tolerance" : []
								};
								obj["tolerance"][layerIdx] = {
										"code" : layerCode,
										"value" : number,
										"condition" : condition,
										"interval" : interval
								}
								strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(obj);
							} else {
								strc["definition"][i]["options"][type3][this.nowOption.alias] = {
										"tolerance" : []
								};
								strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"][layerIdx] = {
										"code" : layerCode,
										"value" : number,
										"condition" : condition,
										"interval" : interval
								};
							}
						}
					} else {
						// type3이 없음
						strc["definition"][i]["options"][type3] = {};
						if (sec) {
							strc["definition"][i]["options"][type3][this.nowOption.alias] = {
									"relation" : []
							};
							var obj = {
									"name" : this.nowRelationCategory,
									"tolerance" : []
							};
							obj["tolerance"][layerIdx] = {
									"code" : layerCode,
									"value" : number,
									"condition" : condition,
									"interval" : interval
							}
							strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(obj);
						} else {
							strc["definition"][i]["options"][type3][this.nowOption.alias] = {
									"tolerance" : []
							};
							strc["definition"][i]["options"][type3][this.nowOption.alias]["tolerance"][layerIdx] = {
									"code" : layerCode,
									"value" : number,
									"condition" : condition,
									"interval" : interval
							};
						}
					}
				}
			}
			// 검수 옵션에 현재 분류가 없음
			if (!isExist) {
				if (sec) {
					var outerObj = {
							"name" : this.nowCategory,
							"options" : {}
					};
					outerObj["options"][type3] = {};
					outerObj["options"][type3][this.nowOption.alias] = {
							"relation" : [ {
								"name" : this.nowRelationCategory,
								"tolerance" : [ {
									"code" : layerCode,
									"value" : number,
									"condition" : condition,
									"interval" : interval
								} ]
							} ]
					};
					strc["definition"].push(outerObj);
				} else {
					var outerObj = {
							"name" : this.nowCategory,
							"options" : {}
					};
					outerObj["options"][type3] = {};
					outerObj["options"][type3][this.nowOption.alias] = {
							"tolerance" : [ {
								"code" : layerCode,
								"value" : number,
								"condition" : condition,
								"interval" : interval
							} ]
					};
					strc["definition"].push(outerObj);
				}
			}
		}
	}
};
/**
 * 피규어 조건을 줄 레이어를 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#selectFigureCode
 * @param {HTMLElement}
 *            sel - 레이어 선택 폼 객체
 */
gb.validation.OptionDefinition.prototype.selectFigureCode = function(sel) {
	var nowOption = this.optItem[this.nowOption.alias];
	if (nowOption === undefined) {
		return;
	}

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	// 레이어 인덱스
	var layerIdx = $(sel).parents().eq(2).index();
	// 코드 중복 상태
	var duplicatedOpt = {};
	// 레이어 코드 필터 영역
	var tup = $(sel).parents().eq(3);
	// 선택된 모든 레이어 코드 셀렉트 옵션
	var selectedCode = $(tup).find(".gb-optiondefinition-select-figurecode");
	var firstSelect = selectedCode[0];
	if (firstSelect !== undefined) {
		var allCode = $(firstSelect).find("option");
		for (var i = 0; i < allCode.length; i++) {
			duplicatedOpt[$(allCode[i]).text()] = false;
		}
	}

	// 추가한 코드들
	var well = $(tup).find(".well");
	// 지금 선택한게 중복인지
	var isExist = false;
	// 모든 웰을 돌면서
	for (var i = 0; i < well.length; i++) {
		// 현재 셀렉트 박스는 재끼고
		if (i === layerIdx) {
			continue;
		}
		var selec = $(well[i]).find(".gb-optiondefinition-select-figurecode");
		duplicatedOpt[$(selec).val()] = true;
	}

	if ((duplicatedOpt[$(sel).val()]) || (well.length > 1 && $(sel).find("option:selected").attr("geom") === "none")) {
		var codeKeys = Object.keys(duplicatedOpt);
		for (var i = 0; i < codeKeys.length; i++) {
			if (!duplicatedOpt[codeKeys[i]]) {
				this.setMessagePopup("danger", this.translation.nomoreadd[this.locale]);
				$(sel).val(codeKeys[i]);
				$(sel).trigger("change");
				return;
			}
		}
	}

	// 레이어 인덱스
	var layerIdx = $(sel).parents().eq(2).index();
	// 레이어 코드
	var layerCode = $(sel).find("option:selected").attr("geom") === "none" ? null : $(sel).val();
	// 검수 항목 정보
	var optItem = this.optItem[this.nowOption.alias];
	// 검수 타입
	var type3 = optItem["purpose"];
	// 현재 코드에 설정된 필터 갯수
	var figures = $(sel).parents().eq(2).find(".gb-optiondefinition-figurearea").children();
	// 현재 레이어코드에 필터가 있는지?
	if (figures.length > 0) {
		var strc = this.getStructure();
		if (Array.isArray(strc["definition"])) {
			var isExist = false;
			for (var i = 0; i < strc["definition"].length; i++) {
				// 현재 검수 옵션에 현재 분류가 있는지?
				if (this.nowCategory === strc["definition"][i].name) {
					isExist = true;
					// 검수 옵션에 현재 타입 키가 있는지 애트리뷰트, 그래픽..
					if (strc["definition"][i]["options"].hasOwnProperty(type3) && !!strc["definition"][i]["options"][type3]) {
						// 현재 검수 항목이 들어있는지?
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								continue;
							}
							console.log("현재 레이어 코드:" + $(sel).val());
							// 릴레이션 레이어 필터일때
							if (sec) {
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
									var relation = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
									if (Array.isArray(relation)) {
										for (var j = 0; j < relation.length; j++) {
											if (relation[j].name === this.nowRelationCategory) {
												// 필터키를 가지고 있는지?
												if (relation[j].hasOwnProperty("figure")) {
													if (Array.isArray(relation[j]["figure"])) {
														for (var k = 0; k < relation[j]["figure"].length; k++) {
															if (relation[j]["figure"][k] !== undefined && relation[j]["figure"][k] !== null) {
																// 코드 키를 가지고
																// 있는지?
																if (relation[j]["figure"][k].hasOwnProperty("code")) {
																	relation[j]["figure"][k]["code"] = layerCode;
																} else {
																	// 코드 키를 가지고
																	// 있지
																	// 않다면
																}
															}
														}
													}
												} else {
													// 필터키를 가지고 있지 않다면
												}
											}
										}
									}
								}
							} else {
								// 그냥 레이어 필터일때
								// 필터 키가 들어있는지
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("figure")) {
									var figures = strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"];
									if (Array.isArray(figures)) {
										if (figures[layerIdx] !== undefined) {
											if (figures[layerIdx].hasOwnProperty("code")) {
												strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["code"] = layerCode;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
/**
 * 피규어 조건의 간격값을 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#inputFigureInterval
 * @param {HTMLElement}
 *            inp - 간격값 입력 폼 객체
 */
// gb.validation.OptionDefinition.prototype.inputFigureInterval = function(inp)
// {
// var optItem = this.optItem[this.nowOption.alias];
// var type3 = optItem["purpose"];
// // 필터 인덱스
// var filterIdx = $(inp).parents().eq(2).index();
// // 레이어 인덱스
// var layerIdx = $(inp).parents().eq(5).index();
// // 레이어 코드
// var layerCode = null;
// if
// (!$(inp).parents().eq(5).find(".gb-optiondefinition-select-figurecode").prop("disabled"))
// {
// layerCode =
// $(inp).parents().eq(5).find(".gb-optiondefinition-select-figurecode
// option").filter(":selected").attr("geom") === "none" ? null
// :
// $(inp).parents().eq(5).find(".gb-optiondefinition-select-figurecode").val();
// }
// // 속성명
// var attrKey = null;
// if
// (!$(inp).parents().eq(2).find(".gb-optiondefinition-input-figurekey").prop("disabled"))
// {
// attrKey =
// $(inp).parents().eq(2).find(".gb-optiondefinition-input-figurekey").val().trim();
// // attrKey =
// //
// $(inp).parents().eq(2).find(".gb-optiondefinition-input-figurekey").val().replace(/(\s*)/g,
// // '');
// }
// // 허용값
// var attrValues = null;
// if
// (!$(inp).parents().eq(2).find(".gb-optiondefinition-input-figurevalues").prop("disabled"))
// {
// attrValues =
// $(inp).parents().eq(2).find(".gb-optiondefinition-input-figurevalues").val().split(",");
// for (var i = 0; i < attrValues.length; i++) {
// attrValues[i] = attrValues[i].trim();
// }
// // attrValues =
// //
// $(inp).parents().eq(2).find(".gb-optiondefinition-input-figurevalues").val().replace(/(\s*)/g,
// // '').split(",");
// }
// // 수치
// var number = null;
// if
// (!$(inp).parents().eq(1).find(".gb-optiondefinition-input-figurenumber").prop("disabled"))
// {
// var temp =
// parseFloat($(inp).parents().eq(1).find(".gb-optiondefinition-input-figurenumber").val());
// if (!isNaN(temp)) {
// number =
// parseFloat($(inp).parents().eq(1).find(".gb-optiondefinition-input-figurenumber").val());
// }
// }
// // 조건
// var condition = null;
// if
// (!$(inp).parents().eq(1).find(".gb-optiondefinition-select-figurecondition").prop("disabled"))
// {
// condition =
// $(inp).parents().eq(1).find(".gb-optiondefinition-select-figurecondition").val();
// }
// // 간격
// var interval = null;
// if (!$(inp).prop("disabled")) {
// var temp = parseFloat($(inp).val());
// if (!isNaN(temp)) {
// interval = temp;
// }
// }
//
// var sec = false;
// if (this.nowDetailCategory !== undefined) {
// if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory
// !== undefined) {
// sec = true;
// }
// }
// var strc = this.getStructure();
// if (Array.isArray(strc["definition"])) {
// var isExist = false;
// // definition에서 현재 분류를 찾는다
// for (var i = 0; i < strc["definition"].length; i++) {
// if (strc["definition"][i]["name"] === this.nowCategory) {
// isExist = true;
// // options 키를 가지고 있는지?
// if (strc["definition"][i].hasOwnProperty("options")) {
// // 검수 타입이 설정 되어있는지
// if (strc["definition"][i]["options"].hasOwnProperty(type3)) {
// // 해당 검수 항목이 설정되어 있는지
// if
// (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias))
// {
// // 현재 입력한 값이 릴레이션 필터 값인지?
// if (sec) {
// // 현재 옵션에 릴레이션 키가 있는지?
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation"))
// {
// // 있다면
// // 배열인지?
// if
// (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"]))
// {
// var isExist = false;
// var rel =
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
// for (var a = 0; a < rel.length; a++) {
// // 필터키 안에 분류 이름이 현재 릴레이션 분류 이름과 같다면
// if (rel[a]["name"] === this.nowRelationCategory) {
// isExist = true;
// var filterKey;
// if (!rel[a].hasOwnProperty("figure")) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"]
// = [];
// }
// filterKey = rel[a]["figure"];
// // 필터가 배열인지?
// if (!Array.isArray(filterKey)) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"]
// = [];
// }
// var filterElem =
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx];
// if (filterElem === undefined) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]
// = {}
// }
// // 필터 배열 원소에 attribute
// // 키가 있는지?
// if (filterElem.hasOwnProperty("attribute")) {
// // attribute 키가
// // 배열인지?
// if (!Array.isArray(filterElem["attribute"])) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["attribute"]
// = [];
// }
// // 배열이 아닐때
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["code"]
// = layerCode;
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["attribute"][filterIdx]
// = {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number
// : null
// : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// };
// } else {
// // 필터 배열 원소에
// // attribute
// // 키가 없다면
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]
// = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number
// : null
// : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// }
// // }
// // else {
// // 필터가 배열이 아니라면
// //
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"]
// // = [ {
// // "code" : layerCode,
// // "attribute" : [ {
// // "key" : attrKey,
// // "values" : Array.isArray(attrValues) ? attrValues : null,
// // "number" : number !== null && number !== undefined ? number !== "" ?
// number
// // : null : null,
// // "condition" : typeof condition === "string" ? condition : null,
// // "interval" : isNaN(interval) ? null : interval
// // } ]
// // } ];
// // }
// // }
// }
// }
// if (!isExist) {
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
// }
// } else {
// // 배열이 아니라면
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
// }
// } else {
// // 현재 옵션에 릴레이션 키가
// // 없다면
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [
// nameElem ];
// }
// // 여기까지 릴레이션
// } else {
// // filter 키가 설정되어있는지?
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("figure"))
// {
// if
// (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"]))
// {
// // filter키가 배열형태임
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]
// === undefined) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]
// = {};
// }
// // attribute 키가 배열 형태임
// if (Array
// .isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"]))
// {
// var tup = $(inp).parents().eq(6);
// var wells = $(tup).find(".well");
// for (var a = 0; a < wells.length; a++) {
// var code = $(wells[a]).find(".gb-optiondefinition-select-figurecode").val();
// if
// ($(wells[a]).find(".gb-optiondefinition-select-figurecode").children('option').filter("option:selected").attr("geom")
// === "none") {
// code = null;
// }
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]
// === undefined) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a] =
// {};
// }
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["code"]
// = code;
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"]
// === undefined ||
// !Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"]))
// {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"]
// = [];
// }
// var farea = $(wells[a]).find(".gb-optiondefinition-figurearea");
// var fdetails = $(farea).find(".gb-optiondefinition-figurearea-row");
// for (var b = 0; b < fdetails.length; b++) {
// var key =
// !$(fdetails[b]).find(".gb-optiondefinition-input-figurekey").prop("disabled")
// ? $(fdetails[b]).find(".gb-optiondefinition-input-figurekey").val() : null;
// var values =
// !$(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").prop("disabled")
// ?
// $(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").val().split(",")
// : null;
// var number =
// !$(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").prop("disabled")
// ?
// !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val()))
// ?
// parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val())
// : null : null;
// var cond =
// !$(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").prop("disabled")
// ? $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val()
// === "null" ? null :
// $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() :
// null;
// var inter =
// !$(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").prop("disabled")
// ?
// !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val()))
// ?
// parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val())
// : null : null;
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"][b]
// = {
// "key" : key,
// "values" : Array.isArray(values) ? values : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof cond === "string" ? cond : null,
// "interval" : isNaN(inter) ? null : inter
// };
// }
// }
// } else {
// // attribute 키가 배열 형태가 아님
// var obj = {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"]
// = [ obj ];
// }
//
// } else {
// // filter키가 배열형태가 아님
// // 허용값이 입력되어있다면 값 변경 / 값은 위에 변수에 할당되어있음
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"] = [
// obj ];
// }
// } else {
// // filter 키가 설정되어있지 않음
// // 허용값이 입력되어있다면 값 변경
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"] = [
// obj ];
// }
// }
// } else {
// // 해당 검수항목이 설정되어 있지 않음
// // 릴레이션임
// if (sec) {
// // 없다면
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [
// nameElem ];
// } else {
// // 해당 검수 항목이 설정되어 있지 않음
// // 허용값이 입력되어있다면 값 변경
// if (Array.isArray(attrValues) && attrValues.length === 1 && attrValues[0] ===
// "" ? false : true) {
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// var filterObj = [ obj ];
// var optionObj = {
// "figure" : filterObj
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias] = optionObj;
// }
// }
// }
// } else {
// // 해당 검수 타입이 설정되어 있지 않음
// if (sec) {
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3] = {};
// strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [
// nameElem ];
//
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [
// obj ];
// } else {
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// var filterObj = [ obj ];
// var optionObj = {
// "figure" : filterObj
// };
// var typeObj = {};
// typeObj[this.nowOption.alias] = optionObj;
// strc["definition"][i]["options"][type3] = typeObj;
// }
// }
// }
// }
// }
// // 정의에 해당 분류가 없음
// if (!isExist) {
// // 릴레이션 설정임
// if (sec) {
// // 해당 검수 타입이 설정되어 있지 않음
// // 허용값이 입력되어있다면 값 변경
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// var optionsObj = [ {
// "name" : this.nowRelationCategory,
// "figure" : [ obj ]
// } ];
//
// var typeObj = {};
// typeObj[type3] = {};
// typeObj[type3][this.nowOption.alias] = {};
// typeObj[type3][this.nowOption.alias]["relation"] = optionsObj;
//
// var definitionObj = {
// "name" : this.nowCategory,
// "options" : typeObj
// };
// this.getStructure()["definition"].push(definitionObj);
// } else {
// // 릴레이션 설정 아님
// // 해당 검수 타입이 설정되어 있지 않음
// // 허용값이 입력되어있다면 값 변경
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// var optionsObj = {
// "figure" : [ obj ]
// };
// var typeObj = {};
// typeObj[type3] = {};
// typeObj[type3][this.nowOption.alias] = optionsObj;
//
// var definitionObj = {
// "name" : this.nowCategory,
// "options" : typeObj
// };
// this.getStructure()["definition"].push(definitionObj);
// }
// }
// }
// }
/**
 * 피규어 조건의 비교 조건을 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#selectFigureCondition
 * @param {HTMLElement}
 *            sel - 비교 조건 선택 폼 객체
 */
gb.validation.OptionDefinition.prototype.selectFigureCondition = function(sel) {
	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];
	// 필터 인덱스
	var filterIdx = $(sel).parents().eq(2).index();
	// 레이어 인덱스
	var layerIdx = $(sel).parents().eq(5).index();
	// 레이어 코드
	var layerCode = null;
	if (!$(sel).parents().eq(5).find(".gb-optiondefinition-select-figurecode").prop("disabled")) {
		layerCode = $(sel).parents().eq(5).find(".gb-optiondefinition-select-figurecode option").filter(":selected").attr("geom") === "none" ? null
				: $(sel).parents().eq(5).find(".gb-optiondefinition-select-figurecode").val();
	}
	// 속성명
	var attrKey = null;
	if (!$(sel).parents().eq(2).find(".gb-optiondefinition-input-figurekey").prop("disabled")) {
		attrKey = $(sel).parents().eq(2).find(".gb-optiondefinition-input-figurekey").val().trim();
		// attrKey =
		// $(sel).parents().eq(2).find(".gb-optiondefinition-input-figurekey").val().replace(/(\s*)/g,
		// '');
	}
	// 허용값
	var attrValues = null;
	if (!$(sel).parents().eq(2).find(".gb-optiondefinition-input-figurevalues").prop("disabled")) {
		attrValues = $(sel).parents().eq(2).find(".gb-optiondefinition-input-figurevalues").val().split(",");
		// attrValues =
		// $(sel).parents().eq(2).find(".gb-optiondefinition-input-figurevalues").val().replace(/(\s*)/g,
		// '').split(",");
		for (var i = 0; i < attrValues.length; i++) {
			attrValues[i] = attrValues[i].trim();
		}
	}
	// 수치
	var number = null;
	if (!$(sel).parents().eq(1).find(".gb-optiondefinition-input-figurenumber").prop("disabled")) {
		var temp = parseFloat($(sel).parents().eq(1).find(".gb-optiondefinition-input-figurenumber").val());
		if (!isNaN(temp)) {
			number = parseFloat($(sel).parents().eq(1).find(".gb-optiondefinition-input-figurenumber").val());
		}
	}
	// 조건
	var condition = $(sel).val();
	if (!$(sel).prop("disabled")) {
		condition = $(sel).val();
	}
	// 간격
	var interval = parseFloat($(sel).parents().eq(1).find(".gb-optiondefinition-input-figureinterval").val());
	if (!$(sel).parents().eq(1).find(".gb-optiondefinition-input-figureinterval").prop("disabled")) {
		interval = parseFloat($(sel).parents().eq(1).find(".gb-optiondefinition-input-figureinterval").val());
	}

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}
	var strc = this.getStructure();
	if (Array.isArray(strc["definition"])) {
		var isExist = false;
		// definition에서 현재 분류를 찾는다
		for (var i = 0; i < strc["definition"].length; i++) {
			if (strc["definition"][i]["name"] === this.nowCategory) {
				isExist = true;
				// options 키를 가지고 있는지?
				if (strc["definition"][i].hasOwnProperty("options")) {
					// 검수 타입이 설정 되어있는지
					if (strc["definition"][i]["options"].hasOwnProperty(type3)) {
						// 해당 검수 항목이 설정되어 있는지
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								continue;
							}
							// 현재 입력한 값이 릴레이션 필터 값인지?
							if (sec) {
								// 현재 옵션에 릴레이션 키가 있는지?
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
									// 있다면
									// 배열인지?
									if (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"])) {
										var isExist = false;
										var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
										for (var a = 0; a < rel.length; a++) {
											// 필터키 안에 분류 이름이 현재 릴레이션 분류 이름과 같다면
											if (rel[a]["name"] === this.nowRelationCategory) {
												isExist = true;
												var filterKey;
												if (rel[a].hasOwnProperty("figure")) {
													filterKey = rel[a]["figure"];
													// 필터가 배열인지?
													if (!Array.isArray(filterKey)) {
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"] = [];
													}
													var filterElem = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx];
													if (filterElem === undefined) {
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx] = {}
													}
													// 필터 배열 원소에 attribute
													// 키가 있는지?
													if (!filterElem.hasOwnProperty("attribute")) {
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["attribute"] = [];
													}
													// attribute 키가
													// 배열인지?
													if (!Array.isArray(filterElem["attribute"])) {
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["attribute"] = [];
													}
													// 배열이 아닐때
													strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["code"] = layerCode;

													strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["attribute"][filterIdx] = {
															"key" : attrKey,
															"values" : Array.isArray(attrValues) ? attrValues : null,
																	"number" : number !== null && number !== undefined ? number !== "" ? number
																			: null
																			: null,
																			"condition" : typeof condition === "string" ? condition : null,
																					"interval" : isNaN(interval) ? null : interval
													};
// }
// else {
// // 필터 배열 원소에
// // attribute
// // 키가 없다면
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]
// = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number
// : null
// : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// }
// }
// else {
// // 필터가 배열이 아니라면
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"]
// = [ {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number
// : null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// } ];
// }
												}
											}
										}
										if (!isExist) {
											var attrElem = [ {
												"key" : attrKey,
												"values" : Array.isArray(attrValues) ? attrValues : null,
														"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
																"condition" : typeof condition === "string" ? condition : null,
																		"interval" : isNaN(interval) ? null : interval
											} ];
											var codeElem = {
													"code" : layerCode,
													"attribute" : attrElem
											};
											var nameElem = {
													"name" : this.nowRelationCategory,
													"figure" : [ codeElem ]
											};
											strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
										}
									} else {
										// 배열이 아니라면
										var attrElem = [ {
											"key" : attrKey,
											"values" : Array.isArray(attrValues) ? attrValues : null,
													"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
															"condition" : typeof condition === "string" ? condition : null,
																	"interval" : isNaN(interval) ? null : interval
										} ];
										var codeElem = {
												"code" : layerCode,
												"attribute" : attrElem
										};
										var nameElem = {
												"name" : this.nowRelationCategory,
												"figure" : [ codeElem ]
										};
										strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
									}
								} else {
									// 현재 옵션에 릴레이션 키가
									// 없다면
									var attrElem = [ {
										"key" : attrKey,
										"values" : Array.isArray(attrValues) ? attrValues : null,
												"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
														"condition" : typeof condition === "string" ? condition : null,
																"interval" : isNaN(interval) ? null : interval
									} ];
									var codeElem = {
											"code" : layerCode,
											"attribute" : attrElem
									};
									var nameElem = {
											"name" : this.nowRelationCategory,
											"figure" : [ codeElem ]
									};
									strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [ nameElem ];
								}
								// 여기까지 릴레이션
							} else {
								// filter 키가 설정되어있는지?
								if (!strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("figure")) {
									strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"] = [];
								}
								if (!Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"])) {
									strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"] = [];
								}
								// filter키가 배열형태임
								if (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx] === undefined) {
									strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx] = {};
								}
								strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["code"] = layerCode;
								// attribute 키가 배열 형태임
								if (!Array
										.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"])) {
									strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"] = [];
								}
								var obj = {
										"key" : attrKey,
										"values" : Array.isArray(attrValues) ? attrValues : null,
												"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
														"condition" : typeof condition === "string" ? condition : null,
																"interval" : isNaN(interval) ? null : interval
								};
								strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"][filterIdx] = obj;
// } else {
// // filter키가 배열형태가 아님
// // 허용값이 입력되어있다면 값 변경 / 값은 위에 변수에 할당되어있음
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"] = [
// obj ];
// }
// } else {
// // filter 키가 설정되어있지 않음
// // 허용값이 입력되어있다면 값 변경
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"] = [
// obj ];
// }
							}
						} else {
							// 해당 검수항목이 설정되어 있지 않음
							// 릴레이션임
							if (sec) {
								// 없다면
								var attrElem = [ {
									"key" : attrKey,
									"values" : Array.isArray(attrValues) ? attrValues : null,
											"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
													"condition" : typeof condition === "string" ? condition : null,
															"interval" : isNaN(interval) ? null : interval
								} ];
								var codeElem = {
										"code" : layerCode,
										"attribute" : attrElem
								};
								var nameElem = {
										"name" : this.nowRelationCategory,
										"figure" : [ codeElem ]
								};
								strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
								strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [ nameElem ];
							} else {
								// 해당 검수 항목이 설정되어 있지 않음
								// 허용값이 입력되어있다면 값 변경
								if (Array.isArray(attrValues) && attrValues.length === 1 && attrValues[0] === "" ? false : true) {
									var obj = {
											"code" : layerCode,
											"attribute" : [ {
												"key" : attrKey,
												"values" : Array.isArray(attrValues) ? attrValues : null,
														"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
																"condition" : typeof condition === "string" ? condition : null,
																		"interval" : isNaN(interval) ? null : interval
											} ]
									};
									var filterObj = [ obj ];
									var optionObj = {
											"figure" : filterObj
									};
									strc["definition"][i]["options"][type3][this.nowOption.alias] = optionObj;
								}
							}
						}
					} else {
						// 해당 검수 타입이 설정되어 있지 않음
						if (sec) {
							var attrElem = [ {
								"key" : attrKey,
								"values" : Array.isArray(attrValues) ? attrValues : null,
										"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
												"condition" : typeof condition === "string" ? condition : null,
														"interval" : isNaN(interval) ? null : interval
							} ];
							var codeElem = {
									"code" : layerCode,
									"attribute" : attrElem
							};
							var nameElem = {
									"name" : this.nowRelationCategory,
									"figure" : [ codeElem ]
							};
							strc["definition"][i]["options"][type3] = {};
							strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
							strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [ nameElem ];

							strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [ obj ];
						} else {
							var obj = {
									"code" : layerCode,
									"attribute" : [ {
										"key" : attrKey,
										"values" : Array.isArray(attrValues) ? attrValues : null,
												"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
														"condition" : typeof condition === "string" ? condition : null,
																"interval" : isNaN(interval) ? null : interval
									} ]
							};
							var filterObj = [ obj ];
							var optionObj = {
									"figure" : filterObj
							};
							var typeObj = {};
							typeObj[this.nowOption.alias] = optionObj;
							strc["definition"][i]["options"][type3] = typeObj;
						}
					}
				}
			}
		}
		// 정의에 해당 분류가 없음
		if (!isExist) {
			// 릴레이션 설정임
			if (sec) {
				// 해당 검수 타입이 설정되어 있지 않음
				// 허용값이 입력되어있다면 값 변경
				var obj = {
						"code" : layerCode,
						"attribute" : [ {
							"key" : attrKey,
							"values" : Array.isArray(attrValues) ? attrValues : null,
									"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
											"condition" : typeof condition === "string" ? condition : null,
													"interval" : isNaN(interval) ? null : interval
						} ]
				};
				var optionsObj = [ {
					"name" : this.nowRelationCategory,
					"figure" : [ obj ]
				} ];

				var typeObj = {};
				typeObj[type3] = {};
				typeObj[type3][this.nowOption.alias] = {};
				typeObj[type3][this.nowOption.alias]["relation"] = optionsObj;

				var definitionObj = {
						"name" : this.nowCategory,
						"options" : typeObj
				};
				this.getStructure()["definition"].push(definitionObj);
			} else {
				// 릴레이션 설정 아님
				// 해당 검수 타입이 설정되어 있지 않음
				// 허용값이 입력되어있다면 값 변경
				var obj = {
						"code" : layerCode,
						"attribute" : [ {
							"key" : attrKey,
							"values" : Array.isArray(attrValues) ? attrValues : null,
									"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
											"condition" : typeof condition === "string" ? condition : null,
													"interval" : isNaN(interval) ? null : interval
						} ]
				};
				var optionsObj = {
						"figure" : [ obj ]
				};
				var typeObj = {};
				typeObj[type3] = {};
				typeObj[type3][this.nowOption.alias] = optionsObj;

				var definitionObj = {
						"name" : this.nowCategory,
						"options" : typeObj
				};
				this.getStructure()["definition"].push(definitionObj);
			}
		}
	}
};
/**
 * 피규어 조건의 숫자형 기준값을 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#inputFigureNumber
 * @param {HTMLElement}
 *            inp - 기준값 입력 폼 객체
 */
// gb.validation.OptionDefinition.prototype.inputFigureNumber = function(inp) {
// var optItem = this.optItem[this.nowOption.alias];
// var type3 = optItem["purpose"];
// // 필터 인덱스
// var filterIdx = $(inp).parents().eq(2).index();
// // 레이어 인덱스
// var layerIdx = $(inp).parents().eq(5).index();
// // 레이어 코드
// var layerCode = null;
// if
// (!$(inp).parents().eq(5).find(".gb-optiondefinition-select-figurecode").prop("disabled"))
// {
// layerCode =
// $(inp).parents().eq(5).find(".gb-optiondefinition-select-figurecode
// option").filter(":selected").attr("geom") === "none" ? null
// :
// $(inp).parents().eq(5).find(".gb-optiondefinition-select-figurecode").val();
// }
// // 속성명
// var attrKey = null;
// if
// (!$(inp).parents().eq(2).find(".gb-optiondefinition-input-figurekey").prop("diabled"))
// {
// attrKey =
// $(inp).parents().eq(2).find(".gb-optiondefinition-input-figurekey").val().trim();
// // attrKey =
// //
// $(inp).parents().eq(2).find(".gb-optiondefinition-input-figurekey").val().replace(/(\s*)/g,
// // '');
// }
// // 허용값
// var attrValues = null;
// if
// (!$(inp).parents().eq(2).find(".gb-optiondefinition-input-figurevalues").prop("disabled"))
// {
// attrValues =
// $(inp).parents().eq(2).find(".gb-optiondefinition-input-figurevalues").val().split(",");
// // attrValues =
// //
// $(inp).parents().eq(2).find(".gb-optiondefinition-input-figurevalues").val().replace(/(\s*)/g,
// // '').split(",");
// for (var i = 0; i < attrValues.length; i++) {
// attrValues[i] = attrValues[i].trim();
// }
// }
// // 수치
// var number = null;
// if (!$(inp).prop("disabled")) {
// var temp = parseFloat($(inp).val());
// if (!isNaN(temp)) {
// number = parseFloat($(inp).val());
// }
// }
// // 조건
// var condition = null;
// if
// (!$(inp).parents().eq(1).find(".gb-optiondefinition-select-figurecondition").prop("disabled"))
// {
// condition =
// $(inp).parents().eq(1).find(".gb-optiondefinition-select-figurecondition").val();
// }
// // 간격
// var interval = null;
// if
// (!$(inp).parents().eq(1).find(".gb-optiondefinition-input-figureinterval").prop("disabled"))
// {
// var temp =
// parseFloat($(inp).parents().eq(1).find(".gb-optiondefinition-input-figureinterval").val());
// if (!isNaN(temp)) {
// interval = temp;
// }
// }
//
// var sec = false;
// if (this.nowDetailCategory !== undefined) {
// if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory
// !== undefined) {
// sec = true;
// }
// }
// var strc = this.getStructure();
// if (Array.isArray(strc["definition"])) {
// var isExist = false;
// // definition에서 현재 분류를 찾는다
// for (var i = 0; i < strc["definition"].length; i++) {
// if (strc["definition"][i]["name"] === this.nowCategory) {
// isExist = true;
// // options 키를 가지고 있는지?
// if (strc["definition"][i].hasOwnProperty("options")) {
// // 검수 타입이 설정 되어있는지
// if (strc["definition"][i]["options"].hasOwnProperty(type3)) {
// // 해당 검수 항목이 설정되어 있는지
// if
// (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias))
// {
// // 현재 입력한 값이 릴레이션 필터 값인지?
// if (sec) {
// // 현재 옵션에 릴레이션 키가 있는지?
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation"))
// {
// // 있다면
// // 배열인지?
// if
// (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"]))
// {
// var isExist = false;
// var rel =
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
// for (var a = 0; a < rel.length; a++) {
// // 필터키 안에 분류 이름이 현재 릴레이션 분류 이름과 같다면
// if (rel[a]["name"] === this.nowRelationCategory) {
// isExist = true;
// var filterKey;
// if (rel[a].hasOwnProperty("figure")) {
// filterKey = rel[a]["figure"];
// // 필터가 배열인지?
// if (!Array.isArray(filterKey)) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"]
// = [];
// }
// var filterElem =
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx];
// if (filterElem === undefined) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]
// = {}
// }
// // 필터 배열 원소에 attribute
// // 키가 있는지?
// if (!filterElem.hasOwnProperty("attribute")) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["attribute"]
// = [];
// }
// // attribute 키가
// // 배열인지?
// if (!Array.isArray(filterElem["attribute"])) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["attribute"]
// = [];
// }
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["code"]
// = layerCode;
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["attribute"][filterIdx]
// = {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number
// : null
// : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// };
// // } else {
// // // 배열이 아닐때
// //
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["code"]
// // = layerCode;
//
// //
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["attribute"][filterIdx]
// // = {
// // "key" : attrKey,
// // "values" : Array.isArray(attrValues) ? attrValues : null,
// // "number" : number !== null && number !== undefined ? number !== "" ?
// number
// // : null
// // : null,
// // "condition" : typeof condition === "string" ? condition : null,
// // "interval" : isNaN(interval) ? null : interval
// // };
// // }
// // } else {
// // // 필터 배열 원소에
// // // attribute
// // // 키가 없다면
// //
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]
// // = {
// // "code" : layerCode,
// // "attribute" : [ {
// // "key" : attrKey,
// // "values" : Array.isArray(attrValues) ? attrValues : null,
// // "number" : number !== null && number !== undefined ? number !== "" ?
// number
// // : null
// // : null,
// // "condition" : typeof condition === "string" ? condition : null,
// // "interval" : isNaN(interval) ? null : interval
// // } ]
// // };
// // }
// // } else {
// // // 필터가 배열이 아니라면
// //
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"]
// // = [ {
// // "code" : layerCode,
// // "attribute" : [ {
// // "key" : attrKey,
// // "values" : Array.isArray(attrValues) ? attrValues : null,
// // "number" : number !== null && number !== undefined ? number !== "" ?
// number
// // : null : null,
// // "condition" : typeof condition === "string" ? condition : null,
// // "interval" : isNaN(interval) ? null : interval
// // } ]
// // } ];
// // }
// }
// }
// }
// if (!isExist) {
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
// }
// } else {
// // 배열이 아니라면
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
// }
// } else {
// // 현재 옵션에 릴레이션 키가
// // 없다면
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [
// nameElem ];
// }
// // 여기까지 릴레이션
// } else {
// // filter 키가 설정되어있는지?
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("figure"))
// {
// // filter키가 배열형태임
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]
// === undefined) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]
// = {};
// }
// // attribute 키가 배열 형태임
// if (Array
// .isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"]))
// {
// var tup = $(inp).parents().eq(6);
// var wells = $(tup).find(".well");
// for (var a = 0; a < wells.length; a++) {
// var code = $(wells[a]).find(".gb-optiondefinition-select-figurecode").val();
// if
// ($(wells[a]).find(".gb-optiondefinition-select-figurecode").children('option').filter("option:selected").attr("geom")
// === "none") {
// code = null;
// }
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]
// === undefined) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a] =
// {};
// }
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["code"]
// = code;
// var farea = $(wells[a]).find(".gb-optiondefinition-figurearea");
// var fdetails = $(farea).find(".gb-optiondefinition-figurearea-row");
// for (var b = 0; b < fdetails.length; b++) {
// var key =
// !$(fdetails[b]).find(".gb-optiondefinition-input-figurekey").prop("disabled")
// ? $(fdetails[b]).find(".gb-optiondefinition-input-figurekey").val() : null;
// var values =
// !$(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").prop("disabled")
// ?
// $(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").val().split(",")
// : null;
// var number =
// !$(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").prop("disabled")
// ?
// !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val()))
// ?
// parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val())
// : null : null;
// var cond =
// !$(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").prop("disabled")
// ? $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() :
// null;
// var inter =
// !$(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").prop("disabled")
// ?
// !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val()))
// ?
// parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val())
// : null : null;
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"]
// === undefined) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"]
// = [];
// }
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"][b]
// = {
// "key" : key,
// "values" : Array.isArray(values) ? values : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof cond === "string" ? cond : null,
// "interval" : isNaN(inter) ? null : inter
// };
// }
// }
// } else {
// // attribute 키가 배열 형태가 아님
// var obj = {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"]
// = [ obj ];
// }
// // if
// //
// (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"]))
// // {
// // // filter키가 배열형태임
// // if
// //
// (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]
// // === undefined) {
// //
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]
// // = {};
// // }
// //
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["code"]
// // = layerCode;
// // // attribute 키가 배열 형태임
// // if (Array
// //
// .isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"]))
// // {
// // var obj = {
// // "key" : attrKey,
// // "values" : Array.isArray(attrValues) ? attrValues : null,
// // "number" : number !== null && number !== undefined ? number !== "" ?
// number :
// // null : null,
// // "condition" : typeof condition === "string" ? condition : null,
// // "interval" : isNaN(interval) ? null : interval
// // };
// //
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"][filterIdx]
// // = obj;
// // } else {
// // // attribute 키가 배열 형태가 아님
// // var obj = {
// // "key" : attrKey,
// // "values" : Array.isArray(attrValues) ? attrValues : null,
// // "number" : number !== null && number !== undefined ? number !== "" ?
// number :
// // null : null,
// // "condition" : typeof condition === "string" ? condition : null,
// // "interval" : isNaN(interval) ? null : interval
// // };
// //
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"]
// // = [ obj ];
// // }
//
// // } else {
// // // filter키가 배열형태가 아님
// // // 허용값이 입력되어있다면 값 변경 / 값은 위에 변수에 할당되어있음
// // var obj = {
// // "code" : layerCode,
// // "attribute" : [ {
// // "key" : attrKey,
// // "values" : Array.isArray(attrValues) ? attrValues : null,
// // "number" : number !== null && number !== undefined ? number !== "" ?
// number :
// // null : null,
// // "condition" : typeof condition === "string" ? condition : null,
// // "interval" : isNaN(interval) ? null : interval
// // } ]
// // };
// // strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"] =
// [
// // obj ];
// // }
// } else {
// // filter 키가 설정되어있지 않음
// // 허용값이 입력되어있다면 값 변경
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"] = [
// obj ];
// }
// }
// } else {
// // 해당 검수항목이 설정되어 있지 않음
// // 릴레이션임
// if (sec) {
// // 없다면
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [
// nameElem ];
// } else {
// // 해당 검수 항목이 설정되어 있지 않음
// // 허용값이 입력되어있다면 값 변경
// if (Array.isArray(attrValues) && attrValues.length === 1 && attrValues[0] ===
// "" ? false : true) {
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// var filterObj = [ obj ];
// var optionObj = {
// "figure" : filterObj
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias] = optionObj;
// }
// }
// }
// } else {
// // 해당 검수 타입이 설정되어 있지 않음
// if (sec) {
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3] = {};
// strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [
// nameElem ];
//
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [
// obj ];
// } else {
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// var filterObj = [ obj ];
// var optionObj = {
// "figure" : filterObj
// };
// var typeObj = {};
// typeObj[this.nowOption.alias] = optionObj;
// strc["definition"][i]["options"][type3] = typeObj;
// }
// }
// }
// }
// }
// // 정의에 해당 분류가 없음
// if (!isExist) {
// // 릴레이션 설정임
// if (sec) {
// // 해당 검수 타입이 설정되어 있지 않음
// // 허용값이 입력되어있다면 값 변경
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// var optionsObj = [ {
// "name" : this.nowRelationCategory,
// "figure" : [ obj ]
// } ];
//
// var typeObj = {};
// typeObj[type3] = {};
// typeObj[type3][this.nowOption.alias] = {};
// typeObj[type3][this.nowOption.alias]["relation"] = optionsObj;
//
// var definitionObj = {
// "name" : this.nowCategory,
// "options" : typeObj
// };
// this.getStructure()["definition"].push(definitionObj);
// } else {
// // 릴레이션 설정 아님
// // 해당 검수 타입이 설정되어 있지 않음
// // 허용값이 입력되어있다면 값 변경
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// var optionsObj = {
// "figure" : [ obj ]
// };
// var typeObj = {};
// typeObj[type3] = {};
// typeObj[type3][this.nowOption.alias] = optionsObj;
//
// var definitionObj = {
// "name" : this.nowCategory,
// "options" : typeObj
// };
// this.getStructure()["definition"].push(definitionObj);
// }
// }
// }
// };
/**
 * 피규어 조건의 속성명을 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#inputFigureKey
 * @param {HTMLElement}
 *            inp - 속성명 입력 폼 객체
 */
gb.validation.OptionDefinition.prototype.inputFigureKey = function(inp) {
	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];
	// 필터 인덱스
	var filterIdx = $(inp).parents().eq(2).index();
	// 레이어 인덱스
	var layerIdx = $(inp).parents().eq(5).index();
	// 레이어 코드
	var layerCode = null;
	if (!$(inp).parents().eq(5).find(".gb-optiondefinition-select-figurecode").prop("disabled")) {
		layerCode = $(inp).parents().eq(5).find(".gb-optiondefinition-select-figurecode option").filter(":selected").attr("geom") === "none" ? null
				: $(inp).parents().eq(5).find(".gb-optiondefinition-select-figurecode").val();
	}

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var isAllCat = false;
	if (this.nowRelationCategory === null) {
		isAllCat = true;
	}

	var strc = this.getStructure();
	if (Array.isArray(strc["definition"])) {
		var isExist = false;
		// definition에서 현재 분류를 찾는다
		for (var i = 0; i < strc["definition"].length; i++) {
			if (strc["definition"][i]["name"] === this.nowCategory) {
				isExist = true;
				// options 키를 가지고 있는지?
				if (strc["definition"][i].hasOwnProperty("options") && !!strc["definition"][i]["options"]) {
					// 검수 타입이 설정 되어있는지
					if (!strc["definition"][i]["options"].hasOwnProperty(type3) || !strc["definition"][i]["options"][type3]) {
						strc["definition"][i]["options"][type3] = {};
						strc["definition"][i]["options"][type3]["run"] = true;
					}
					// 해당 검수 항목이 설정되어 있는지
					if (!strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias) || !strc["definition"][i]["options"][type3][this.nowOption.alias]) {
						strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
						strc["definition"][i]["options"][type3][this.nowOption.alias]["run"] = true;
					}
					// 현재 입력한 값이 릴레이션 필터 값인지?
					if (sec) {
						// 현재 옵션에 릴레이션 키가 있는지?
						if (!strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
							strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [];
						}
						// 있다면
						// 배열인지?
						if (!Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"])) {
							strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [];
						}
						var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
						if (isAllCat) {
							var layerDef = this.getLayerDefinition().getStructure();
							// 모든 레이어 정의에있는 분류와
							for (var a = 0; a < layerDef.length; a++) {
								var isExist2 = false;
								var existIdx;
								// 현재 릴레이션에 있는 분류를 비교해서
								for (var b = 0; b < rel.length; b++) {
									// 같은게 있는지
									if(layerDef[a]["name"] === rel[b]["name"]){
										// 같은 분류가 존재함
										isExist2 = true;
										// 같은 분류의 인덱스
										existIdx = b;
										break;
									}
								}
								// 전체 레이어 정의 분류와 릴레이션 레이어 분류와
								// 같은게 있을때
								if (isExist2) {
									// 해당 릴레이션의 인덱스로 객체를 특정하고
									var erel = rel[existIdx];
									if (erel === undefined) {
										rel[existIdx] = {};
									}
									// 필터 키 객체 꺼내기
									var filterArr = erel["figure"];
									if (filterArr === undefined || !Array.isArray(filterArr)) {
										erel["figure"] = [];
									}
									// 레이어 코드는 널로 입력
									var code = null;
									// 속성 배열
									var attribute = [];
									// 입력 폼 영역
									var filterArea = $(inp).parents().eq(3);
									var rows = $(filterArea).find(".gb-optiondefinition-figurearea-row");
									// 각 행별로
									for (var c = 0; c < rows.length; c++) {
										var row = rows[c];

										var fidx = !$(row).find(".gb-optiondefinition-select-figuretofilter").prop("disabled") ? $(row).find(".gb-optiondefinition-select-figuretofilter").val() === "null" ? null : $(row).find(".gb-optiondefinition-select-figuretofilter").val() : null;
										var key = !$(row).find(".gb-optiondefinition-input-figurekey").prop("disabled") ? $(row).find(".gb-optiondefinition-input-figurekey").val() : null;
										var formValues = $(row).find(".gb-optiondefinition-input-figurevalues").val().split(",");
										var values = !$(row).find(".gb-optiondefinition-input-figurevalues").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
										var number = !$(row).find(".gb-optiondefinition-input-figurenumber").prop("disabled") ? !isNaN(parseFloat($(row).find(".gb-optiondefinition-input-figurenumber").val())) ? parseFloat($(row).find(".gb-optiondefinition-input-figurenumber").val()) : null : null;
										var cond = !$(row).find(".gb-optiondefinition-select-figurecondition").prop("disabled") ? $(row).find(".gb-optiondefinition-select-figurecondition").val() === "null" ? null : $(row).find(".gb-optiondefinition-select-figurecondition").val() : null;
										var inter = !$(row).find(".gb-optiondefinition-input-figureinterval").prop("disabled") ? !isNaN(parseFloat($(row).find(".gb-optiondefinition-input-figureinterval").val())) ? parseFloat($(row).find(".gb-optiondefinition-input-figureinterval").val()) : null : null;

										var attrObj = {
												"fidx": fidx,
												"key" : key,
												"values" : values,
												"number" : number,
												"condition" : cond,
												"interval" : inter
										}; 
										// 배열에 넣기
										attribute[c] = attrObj;
									}
									// 필터 객체로 만들어서
									var filterObj = {
											"code" : code,
											"attribute" : attribute
									};
									// 필터 배열에 넣기
									erel["figure"] = [filterObj];
								} else {
									// 릴레이션 배열에 없을때
									// 없는 이름을 가져오기
									var nrel = layerDef[a]["name"];
									// 모든 레이어코드는 널로 입력
									var code = null;
									var attribute = [];
									var filterArea = $(inp).parents().eq(3);
									var rows = $(filterArea).find(".gb-optiondefinition-figurearea-row");
// var rows = $(filterArea).find(".row");
									for (var c = 0; c < rows.length; c++) {
										var row = rows[c];
										var fidx = !$(row).find(".gb-optiondefinition-select-figuretofilter").prop("disabled") ? $(row).find(".gb-optiondefinition-select-figuretofilter").val() === "null" ? null : $(row).find(".gb-optiondefinition-select-figuretofilter").val() : null;
										var key = !$(row).find(".gb-optiondefinition-input-figurekey").prop("disabled") ? $(row).find(".gb-optiondefinition-input-figurekey").val() : null;
										var formValues = $(row).find(".gb-optiondefinition-input-figurevalues").val().split(",");
										var values = !$(row).find(".gb-optiondefinition-input-figurevalues").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
										var number = !$(row).find(".gb-optiondefinition-input-figurenumber").prop("disabled") ? !isNaN(parseFloat($(row).find(".gb-optiondefinition-input-figurenumber").val())) ? parseFloat($(row).find(".gb-optiondefinition-input-figurenumber").val()) : null : null;
										var cond = !$(row).find(".gb-optiondefinition-select-figurecondition").prop("disabled") ? $(row).find(".gb-optiondefinition-select-figurecondition").val() === "null" ? null : $(row).find(".gb-optiondefinition-select-figurecondition").val()  : null;
										var inter = !$(row).find(".gb-optiondefinition-input-figureinterval").prop("disabled") ? !isNaN(parseFloat($(row).find(".gb-optiondefinition-input-figureinterval").val())) ? parseFloat($(row).find(".gb-optiondefinition-input-figureinterval").val()) : null : null;

										var attrObj = {
												"fidx": fidx,
												"key" : key,
												"values" : values,
												"number" : number,
												"condition" : cond,
												"interval" : inter
										}; 
										attribute[c] = attrObj;
									}
									var filterObj = {
											"code" : null,
											"attribute" : attribute
									}
									var filterArr = [filterObj];
									var relObj = {
											"name" : nrel,
											"figure" : filterArr
									};
									// 릴레이션 배열에 푸시
									rel.push(relObj);
								}
							}
						} else {
							var isExist2= false;
							var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
							for (var a = 0; a < rel.length; a++) {
								// 필터키 안에 분류 이름이 현재 릴레이션 분류 이름과 같다면
								if (rel[a]["name"] === this.nowRelationCategory) {
									isExist2 = true;
									var filterKey;
									if (rel[a].hasOwnProperty("figure")) {
										filterKey = rel[a]["figure"];
										// 필터가 배열인지?
										if (!Array.isArray(filterKey)) {
											strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"] = [];
										}

										var tup = $(inp).parents().eq(6);
										var wells = $(tup).find(".well");
										for (var c = 0; c < wells.length; c++) {
											var code = $(wells[c]).find(".gb-optiondefinition-select-figurecode").val();
											if ($(wells[c]).find(".gb-optiondefinition-select-figurecode").children('option').filter("option:selected").attr("geom") === "none") {
												code = null;
											}
											if (strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][c] === undefined) {
												strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][c] = {};	
											}
											strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][c]["code"] = code;
											if (strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][c]["attribute"] === undefined || !Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][a]["attribute"])) {
												strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][c]["attribute"] = [];
											}
											var farea = $(wells[c]).find(".gb-optiondefinition-figurearea");
											var fdetails = $(farea).find(".gb-optiondefinition-figurearea-row");
											for (var b = 0; b < fdetails.length; b++) {
												var fidx = !$(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").val() === "null" ? null : $(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").val() : null;
												var key = !$(fdetails[b]).find(".gb-optiondefinition-input-figurekey").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-figurekey").val() : null;
												var formValues = $(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").val().split(",");
												var values = !$(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
												var number = !$(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").prop("disabled") ? !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val())) ? parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val()) : null : null;
												var cond = !$(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() === "null" ? null : $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() : null;
												var inter = !$(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").prop("disabled") ? !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val())) ? parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val()) : null : null;
												strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][c]["attribute"][b] = {
														"fidx" : !isNaN(parseInt(fidx)) ? parseInt(fidx) : null,
																"key" : key,
																"values" : Array.isArray(values) ? values : null,
																		"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
																				"condition" : typeof cond === "string" ? cond === "null" ? null : cond : null,
																						"interval" : isNaN(inter) ? null : inter
												};
											}
										}
									}
								}
							}
							if (!isExist2) {
								var tup = $(inp).parents().eq(6);
								var wells = $(tup).find(".well");
								for (var c = 0; c < wells.length; c++) {
									var code = $(wells[c]).find(".gb-optiondefinition-select-figurecode").val();
									if ($(wells[c]).find(".gb-optiondefinition-select-figurecode").children('option').filter("option:selected").attr("geom") === "none") {
										code = null;
									}

									var attrElem = [];

									var codeElem = {
											"code" : code,
											"attribute" : attrElem
									};

									var farea = $(wells[c]).find(".gb-optiondefinition-figurearea");
									var fdetails = $(farea).find(".gb-optiondefinition-figurearea-row");
									for (var b = 0; b < fdetails.length; b++) {
										var fidx = !$(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").val() === "null" ? null : $(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").val() : null;
										var key = !$(fdetails[b]).find(".gb-optiondefinition-input-figurekey").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-figurekey").val() : null;
										var formValues = $(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").val().split(",");
										var values = !$(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
										var number = !$(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").prop("disabled") ? !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val())) ? parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val()) : null : null;
										var cond = !$(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() === "null" ? null : $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() : null;
										var inter = !$(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").prop("disabled") ? !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val())) ? parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val()) : null : null;
										attrElem[b] = {
												"fidx" : !isNaN(parseInt(fidx)) ? parseInt(fidx) : null,
														"key" : key,
														"values" : Array.isArray(values) ? values : null,
																"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
																		"condition" : typeof cond === "string" ? cond === "null" ? null : cond : null,
																				"interval" : isNaN(inter) ? null : inter
										};
									}
								}
								var nameElem = {
										"name" : this.nowRelationCategory,
										"figure" : [ codeElem ]
								};
								strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
							}							
						}
						// 여기까지 릴레이션
					} else {
						// filter 키가 설정되어있는지?
						if (!strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("figure")) {
							strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"] = [];
						}
						if (!Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"])) {
							strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"] = [];
						}
						// filter키가 배열형태임
						if (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx] === undefined) {
							strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx] = {};
						}
						// attribute 키가 배열 형태임
						if (!Array
								.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"])) {
							strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"] = [];
						}
						var tup = $(inp).parents().eq(6);
						var wells = $(tup).find(".well");
						for (var a = 0; a < wells.length; a++) {
							var code = $(wells[a]).find(".gb-optiondefinition-select-figurecode").val();
							if ($(wells[a]).find(".gb-optiondefinition-select-figurecode").children('option').filter("option:selected").attr("geom") === "none") {
								code = null;
							}
							if (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a] === undefined) {
								strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a] = {};	
							}
							strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["code"] = code;
							if (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"] === undefined || !Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"])) {
								strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"] = [];
							}
							var farea = $(wells[a]).find(".gb-optiondefinition-figurearea");
							var fdetails = $(farea).find(".gb-optiondefinition-figurearea-row");
							for (var b = 0; b < fdetails.length; b++) {
								var fidx = !$(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").val() === "null" ? null : $(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").val() : null;
								var key = !$(fdetails[b]).find(".gb-optiondefinition-input-figurekey").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-figurekey").val() : null;
								var formValues = $(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").val().split(",");
								var values = !$(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
								var number = !$(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").prop("disabled") ? !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val())) ? parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val()) : null : null;
								var cond = !$(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() ===  "null" ? null : $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() : null;
								var inter = !$(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").prop("disabled") ? !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val())) ? parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val()) : null : null;
								strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"][b] = {
										"fidx" : !isNaN(parseInt(fidx)) ? parseInt(fidx) : null,
												"key" : key,
												"values" : Array.isArray(values) ? values : null,
														"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
																"condition" : typeof cond === "string" ? cond === "null" ? null : cond : null,
																		"interval" : isNaN(inter) ? null : inter
								};
							}
						}
					}
				}
			}
		}
		// 정의에 해당 분류가 없음
		if (!isExist) {
			// 릴레이션 설정임
			if (sec) {
				if (isAllCat) {
// var rel =
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
					var layerDef = this.getLayerDefinition().getStructure();
					var relObj = [];
					// 모든 레이어 정의에있는 분류와
					for (var a = 0; a < layerDef.length; a++) {
						var tup = $(inp).parents().eq(6);
						var wells = $(tup).find(".well");
						for (var c = 0; c < wells.length; c++) {
							var code = $(wells[c]).find(".gb-optiondefinition-select-figurecode").val();
							if ($(wells[c]).find(".gb-optiondefinition-select-figurecode").children('option').filter("option:selected").attr("geom") === "none") {
								code = null;
							}
							var attrElem = [];

							var codeElem = {
									"code" : code,
									"attribute" : attrElem
							};

							var farea = $(wells[c]).find(".gb-optiondefinition-figurearea");
							var fdetails = $(farea).find(".gb-optiondefinition-figurearea-row");
							for (var b = 0; b < fdetails.length; b++) {
								var fidx = !$(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").val()=== "null" ? null : $(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").val() : null;
								var key = !$(fdetails[b]).find(".gb-optiondefinition-input-figurekey").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-figurekey").val() : null;
								var formValues = $(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").val().split(",");
								var values = !$(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
								var number = !$(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").prop("disabled") ? !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val())) ? parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val()) : null : null;
								var cond = !$(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() === "null" ? null : $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() : null;
								var inter = !$(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").prop("disabled") ? !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val())) ? parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val()) : null : null;
								attrElem[b] = {
										"fidx" : !isNaN(parseInt(fidx)) ? parseInt(fidx) : null,
												"key" : key,
												"values" : Array.isArray(values) ? values : null,
														"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
																"condition" : typeof cond === "string" ? cond === "null" ? null : cond : null,
																		"interval" : isNaN(inter) ? null : inter
								};
							}
						}

						var figureObj = {
								"name" : layerDef[a]["name"],
								"figure" : [ codeElem ]		
						};
						relObj.push(figureObj);
					}
					
					var typeObj = {};
					typeObj[type3] = {};
					typeObj[type3]["run"] = true;
					typeObj[type3][this.nowOption.alias] = {};
					typeObj[type3][this.nowOption.alias]["run"] = true;
					typeObj[type3][this.nowOption.alias]["relation"] = relObj;

					var definitionObj = {
							"name" : this.nowCategory,
							"options" : typeObj
					};
					this.getStructure()["definition"].push(definitionObj);
				} else {
					var tup = $(inp).parents().eq(6);
					var wells = $(tup).find(".well");
					for (var c = 0; c < wells.length; c++) {
						var code = $(wells[c]).find(".gb-optiondefinition-select-figurecode").val();
						if ($(wells[c]).find(".gb-optiondefinition-select-figurecode").children('option').filter("option:selected").attr("geom") === "none") {
							code = null;
						}
						var attrElem = [];

						var codeElem = {
								"code" : code,
								"attribute" : attrElem
						};

						var farea = $(wells[c]).find(".gb-optiondefinition-figurearea");
						var fdetails = $(farea).find(".gb-optiondefinition-figurearea-row");
						for (var b = 0; b < fdetails.length; b++) {
							var fidx = !$(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").val() === "null" ? null :  $(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").val() : null;
							var key = !$(fdetails[b]).find(".gb-optiondefinition-input-figurekey").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-figurekey").val() : null;
							var formValues = $(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").val().split(",");
							var values = !$(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
							var number = !$(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").prop("disabled") ? !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val())) ? parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val()) : null : null;
							var cond = !$(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() === "null" ? null : $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() : null;
							var inter = !$(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").prop("disabled") ? !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val())) ? parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val()) : null : null;
							attrElem[b] = {
									"fidx" : !isNaN(parseInt(fidx)) ? parseInt(fidx) : null,
											"key" : key,
											"values" : Array.isArray(values) ? values : null,
													"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
															"condition" : typeof cond === "string" ? cond === "null" ? null : cond : null,
																	"interval" : isNaN(inter) ? null : inter
							};
						}
					}

					var optionsObj = [ {
						"name" : this.nowRelationCategory,
						"figure" : [ codeElem ]
					} ];

					var typeObj = {};
					typeObj[type3] = {};
					typeObj[type3]["run"] = true;
					typeObj[type3][this.nowOption.alias] = {};
					typeObj[type3][this.nowOption.alias]["run"] = true;
					typeObj[type3][this.nowOption.alias]["relation"] = optionsObj;

					var definitionObj = {
							"name" : this.nowCategory,
							"options" : typeObj
					};
					this.getStructure()["definition"].push(definitionObj);
				}
			} else {
				// 릴레이션 설정 아님
				// 해당 검수 타입이 설정되어 있지 않음
				// 허용값이 입력되어있다면 값 변경

				var optionsObj = {
						"run" : true,
						"figure" : []
				};
				var typeObj = {};
				typeObj[type3] = {};
				typeObj[type3]["run"] = true;
				typeObj[type3][this.nowOption.alias] = optionsObj;

				var tup = $(inp).parents().eq(6);
				var wells = $(tup).find(".well");
				for (var a = 0; a < wells.length; a++) {
					var code = $(wells[a]).find(".gb-optiondefinition-select-figurecode").val();
					if ($(wells[a]).find(".gb-optiondefinition-select-figurecode").children('option').filter("option:selected").attr("geom") === "none") {
						code = null;
					}
					if (optionsObj["figure"][a] === undefined) {
						optionsObj["figure"][a] = {};	
					}
					optionsObj["figure"][a]["code"] = code;
					if (optionsObj["figure"][a]["attribute"] === undefined) {
						optionsObj["figure"][a]["attribute"] = [];
					}
					var farea = $(wells[a]).find(".gb-optiondefinition-figurearea");
					var fdetails = $(farea).find(".gb-optiondefinition-figurearea-row");
					for (var b = 0; b < fdetails.length; b++) {
						var fidx = !$(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").val() === "null" ? null : $(fdetails[b]).find(".gb-optiondefinition-select-figuretofilter").val() : null;
						var key = !$(fdetails[b]).find(".gb-optiondefinition-input-figurekey").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-figurekey").val() : null;
						var formValues = $(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").val().split(",");
						var values = !$(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
						var number = !$(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").prop("disabled") ? !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val())) ? parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val()) : null : null;
						var cond = !$(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() === "null" ? null : $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() : null;
						var inter = !$(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").prop("disabled") ? !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val())) ? parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val()) : null : null;
						optionsObj["figure"][a]["attribute"][b] = {
								"fidx" : !isNaN(parseInt(fidx)) ? parseInt(fidx) : null,
										"key" : key,
										"values" : Array.isArray(values) ? values : null,
												"number" : number !== null && number !== undefined ? number !== "" ? number : null : null,
														"condition" : typeof cond === "string" ? cond === "null" ? null : cond : null,
																"interval" : isNaN(inter) ? null : inter
						};
					}
				}

				var definitionObj = {
						"name" : this.nowCategory,
						"options" : typeObj
				};
				this.getStructure()["definition"].push(definitionObj);
			}
		}
	}
};
/**
 * 레이어의 필터 설정을 삭제한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#deleteFilterRow
 * @param {HTMLElement}
 *            btn - 설정 삭제 버튼 객체
 */
gb.validation.OptionDefinition.prototype.deleteFilterRow = function(btn) {
	// 필터 엘리먼트
	var filterElem = $(btn).parents().eq(1);
	// 필터 인덱스
	var filterIdx = $(filterElem).index();
	// 레이어 인덱스
	var layerIdx = $(btn).parents().eq(4).index();

	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];

	var strc = this.getStructure();

	if (type3 === "none") {
		if(strc["filter"] !== undefined){
			var arr;
			if (this.nowOption.alias === "FeatureFilter") {
				arr = strc["filter"]["attribute"]; 
			} else if (this.nowOption.alias === "EditingState") {
				arr = strc["filter"]["state"];
			}
			arr.splice(filterIdx, 1);
			if (arr.length === 0) {
				if (this.nowOption.alias === "FeatureFilter") {
					strc["filter"]["attribute"] = undefined; 
				} else if (this.nowOption.alias === "EditingState") {
					strc["filter"]["state"] = undefined;
				}
			}
		}
		$(filterElem).remove();
		return;
	}

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var isAllCat = false;
	if (this.nowRelationCategory === null) {
		isAllCat = true;
	}

	if (Array.isArray(strc["definition"])) {
		var isExist = false;
		// definition에서 현재 분류를 찾는다
		for (var i = 0; i < strc["definition"].length; i++) {
			if (strc["definition"][i]["name"] === this.nowCategory) {
				isExist = true;
				// options 키를 가지고 있는지?
				if (strc["definition"][i].hasOwnProperty("options")) {
					// 검수 타입이 설정 되어있는지
					if (strc["definition"][i]["options"].hasOwnProperty(type3)) {
						// 해당 검수 항목이 설정되어 있는지
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								continue;
							}
							if (sec) {
								// relation 키가 설정되어 있는지?
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
									var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
									// relation이 배열인지?
									if (Array.isArray(rel)) {

										if (isAllCat) {
											var layerDef = this.getLayerDefinition().getStructure();
											for (var j = 0; j < rel.length; j++) {
												if (rel[j]) {
													if (rel[j].hasOwnProperty("filter")) {
														if (Array.isArray(rel[j]["filter"])) {
															strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["filter"][0]["attribute"]
															.splice(filterIdx, 1);
															/*
															 * if
															 * (rel[j]["filter"].length
															 * === 0) { delete
															 * strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["filter"]; }
															 */
														}
													}
												}
											}
										} else {
											for (var j = 0; j < rel.length; j++) {
												if (rel[j]["name"] === this.nowRelationCategory) {
													if (rel[j].hasOwnProperty("filter")) {
														if (Array.isArray(rel[j]["filter"])) {
															strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["filter"][layerIdx]["attribute"]
															.splice(filterIdx, 1);
															/*
															 * if
															 * (rel[j]["filter"].length
															 * === 0) { delete
															 * strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["filter"]; }
															 */
														}
													}
												}
											}
										}
									}
								}
							} else {
								// filter 키가 설정되어있는지?
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("filter")) {
									if (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"])) {
										// filter키가 배열형태임
										var attr = strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][layerIdx]["attribute"];
										if (Array.isArray(attr)) {
											strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][layerIdx]["attribute"]
											.splice(filterIdx, 1);
										}
									}
								}
							}
						}
					}
				}
			}
		}
		$(filterElem).remove();
	}
};
/**
 * 레이어에 설정된 필터를 삭제한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#deleteLayerCodeFilter
 * @param {HTMLElement}
 *            btn - 설정 삭제 버튼 객체
 */
gb.validation.OptionDefinition.prototype.deleteLayerCodeFilter = function(btn) {
	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];
	// 레이어 엘리먼트
	var layerElem = $(btn).parents().eq(2);
	// 레이어 코드 인덱스
	var layerIdx = $(layerElem).index();

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var strc = this.getStructure();
	if (Array.isArray(strc["definition"])) {
		var isExist = false;
		// definition에서 현재 분류를 찾는다
		for (var i = 0; i < strc["definition"].length; i++) {
			if (strc["definition"][i]["name"] === this.nowCategory) {
				isExist = true;
				// options 키를 가지고 있는지?
				if (strc["definition"][i].hasOwnProperty("options")) {
					// 검수 타입이 설정 되어있는지
					if (strc["definition"][i]["options"].hasOwnProperty(type3)) {
						// 해당 검수 항목이 설정되어 있는지
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								continue;
							}
							if (sec) {
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
									if (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"])) {
										var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
										for (var j = 0; j < rel.length; j++) {
											if (rel[j]["name"] === this.nowRelationCategory) {
												if (rel[j].hasOwnProperty("filter")) {
													if (Array.isArray(rel[j]["filter"])) {
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["filter"]
														.splice(layerIdx, 1);
														if (strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["filter"].length === 0) {
															delete strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]["filter"];
														}
														var types = Object
														.keys(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j]);
														if (types.length === 1) {
															strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"]
															.splice(j, 1);
															if (strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].length === 0) {
																delete strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
															}
														}
													}
												}
											}
										}
									}
								}
							} else {
								// filter 키가 설정되어있는지?
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("filter")) {
									var filter = strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"];
									if (Array.isArray(filter)) {
										strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"].splice(layerIdx, 1);
										// $(layerElem).remove();
										if (strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"].length === 0) {
											delete strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"];
										}
									}
								}
							}
							var optionKeys = Object.keys(strc["definition"][i]["options"][type3][this.nowOption.alias]);
							if (optionKeys.length === 0 || (optionKeys.length === 1 && optionKeys[0] === "run")) {
								delete strc["definition"][i]["options"][type3][this.nowOption.alias];
								var typeKeys = Object.keys(strc["definition"][i]["options"][type3]);
								if (typeKeys.length === 0 || (typeKeys.length === 1 && typeKeys[0] === "run")) {
									delete strc["definition"][i]["options"][type3];
									var keys = Object.keys(strc["definition"][i]["options"]);
									if (keys.length === 0) {
										strc["definition"].splice(layerIdx, 1);
									}
								}
							}
						}
					}
				}
			}
		}
		$(layerElem).remove();
	}
};
// /**
// * 피규어 조건의 허용값을 설정한다.
// *
// * @private
// * @method gb.validation.OptionDefinition#inputFigureValues
// * @param {HTMLElement}
// * inp - 허용값 입력 폼 객체
// */
// gb.validation.OptionDefinition.prototype.inputFigureValues = function(inp) {
// var optItem = this.optItem[this.nowOption.alias];
// var type3 = optItem["purpose"];
// // 필터 인덱스
// var filterIdx = $(inp).parents().eq(2).index();
// // 레이어 인덱스
// var layerIdx = $(inp).parents().eq(5).index();
// // 레이어 코드
// var layerCode = null;
// if
// (!$(inp).parents().eq(5).find(".gb-optiondefinition-select-figurecode").prop("disabled"))
// {
// layerCode =
// $(inp).parents().eq(5).find(".gb-optiondefinition-select-figurecode
// option").filter(":selected").attr("geom") === "none" ? null
// :
// $(inp).parents().eq(5).find(".gb-optiondefinition-select-figurecode").val();
// }
// // 속성명
// var attrKey = null;
// if
// (!$(inp).parents().eq(1).find(".gb-optiondefinition-input-figurekey").prop("disabled"))
// {
// attrKey =
// $(inp).parents().eq(1).find(".gb-optiondefinition-input-figurekey").val().trim();
// // attrKey =
// //
// $(inp).parents().eq(1).find(".gb-optiondefinition-input-figurekey").val().replace(/(\s*)/g,
// // '');
// }
// // 허용값
// var attrValues = null;
// if (!$(inp).prop("disabled")) {
// attrValues = $(inp).val().split(",");
// for (var i = 0; i < attrValues.length; i++) {
// attrValues[i] = attrValues[i].trim();
// }
// // attrValues = $(inp).val().replace(/(\s*)/g, '').split(",");
// }
// // 수치
// var number = null;
// if
// (!$(inp).parents().eq(2).find(".gb-optiondefinition-input-figurenumber").prop("disabled"))
// {
// var temp =
// parseFloat($(inp).parents().eq(2).find(".gb-optiondefinition-input-figurenumber").val());
// if (!isNaN(temp)) {
// number =
// parseFloat($(inp).parents().eq(2).find(".gb-optiondefinition-input-figurenumber").val());
// }
// }
// // 조건
// var condition = null;
// if
// (!$(inp).parents().eq(2).find(".gb-optiondefinition-select-figurecondition").prop("disabled"))
// {
// condition =
// $(inp).parents().eq(2).find(".gb-optiondefinition-select-figurecondition").val();
// }
// // 간격
// var interval = null;
// if
// (!$(inp).parents().eq(2).find(".gb-optiondefinition-input-figureinterval").prop("disabled"))
// {
// var temp =
// parseFloat($(inp).parents().eq(2).find(".gb-optiondefinition-input-figureinterval").val());
// if (!isNaN(temp)) {
// interval = temp;
// }
// }
//
// var sec = false;
// if (this.nowDetailCategory !== undefined) {
// if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory
// !== undefined) {
// sec = true;
// }
// }
// var strc = this.getStructure();
// if (Array.isArray(strc["definition"])) {
// var isExist = false;
// // definition에서 현재 분류를 찾는다
// for (var i = 0; i < strc["definition"].length; i++) {
// if (strc["definition"][i]["name"] === this.nowCategory) {
// isExist = true;
// // options 키를 가지고 있는지?
// if (strc["definition"][i].hasOwnProperty("options")) {
// // 검수 타입이 설정 되어있는지
// if (strc["definition"][i]["options"].hasOwnProperty(type3)) {
// // 해당 검수 항목이 설정되어 있는지
// if
// (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias))
// {
// // 현재 입력한 값이 릴레이션 필터 값인지?
// if (sec) {
// // 현재 옵션에 릴레이션 키가 있는지?
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation"))
// {
// // 있다면
// // 배열인지?
// if
// (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"]))
// {
// var isExist = false;
// var rel =
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
// for (var a = 0; a < rel.length; a++) {
// // 필터키 안에 분류 이름이 현재 릴레이션 분류 이름과 같다면
// if (rel[a]["name"] === this.nowRelationCategory) {
// isExist = true;
// var filterKey;
// if (rel[a].hasOwnProperty("figure")) {
// filterKey = rel[a]["figure"];
// // 필터가 배열인지?
// if (!Array.isArray(filterKey)) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"]
// = [];
// }
// var filterElem =
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx];
// if (filterElem === undefined) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]
// = {};
// }
// // 필터 배열 원소에 attribute
// // 키가 있는지?
// if (!filterElem.hasOwnProperty("attribute")) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["attribute"]
// = [];
// }
// // attribute 키가
// // 배열인지?
// if (!Array.isArray(filterElem["attribute"])) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["attribute"]
// = [];
// }
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["code"]
// = layerCode;
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["figure"][layerIdx]["attribute"][filterIdx]
// = {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number
// : null
// : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// };
// }
// }
// }
// if (!isExist) {
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
// }
// } else {
// // 배열이 아니라면
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
// }
// } else {
// // 현재 옵션에 릴레이션 키가
// // 없다면
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [
// nameElem ];
// }
// // 여기까지 릴레이션
// } else {
// // filter 키가 설정되어있는지?
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("figure"))
// {
// if
// (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"]))
// {
// // filter키가 배열형태임
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]
// === undefined) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]
// = {};
// }
// // attribute 키가 배열 형태임
// if (Array
// .isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"]))
// {
// var tup = $(inp).parents().eq(6);
// var wells = $(tup).find(".well");
// for (var a = 0; a < wells.length; a++) {
// var code = $(wells[a]).find(".gb-optiondefinition-select-figurecode").val();
// if
// ($(wells[a]).find(".gb-optiondefinition-select-figurecode").children('option').filter("option:selected").attr("geom")
// === "none") {
// code = null;
// }
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]
// === undefined) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a] =
// {};
// }
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["code"]
// = code;
// if
// (strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"]
// === undefined) {
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"]
// = [];
// }
// var farea = $(wells[a]).find(".gb-optiondefinition-figurearea");
// var fdetails = $(farea).find(".gb-optiondefinition-figurearea-row");
// for (var b = 0; b < fdetails.length; b++) {
// var key =
// !$(fdetails[b]).find(".gb-optiondefinition-input-figurekey").prop("disabled")
// ? $(fdetails[b]).find(".gb-optiondefinition-input-figurekey").val().trim() :
// null;
// var values =
// !$(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").prop("disabled")
// ?
// $(fdetails[b]).find(".gb-optiondefinition-input-figurevalues").val().split(",")
// : null;
// for (var c = 0; c < values.length; c++) {
// values[c] = values[c].trim();
// }
// var number =
// !$(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").prop("disabled")
// ?
// !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val()))
// ?
// parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figurenumber").val())
// : null : null;
// var cond =
// !$(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").prop("disabled")
// ? $(fdetails[b]).find(".gb-optiondefinition-select-figurecondition").val() :
// null;
// var inter =
// !$(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").prop("disabled")
// ?
// !isNaN(parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val()))
// ?
// parseFloat($(fdetails[b]).find(".gb-optiondefinition-input-figureinterval").val())
// : null : null;
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][a]["attribute"][b]
// = {
// "key" : key,
// "values" : Array.isArray(values) ? values : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof cond === "string" ? cond : null,
// "interval" : isNaN(inter) ? null : inter
// };
// }
// }
// } else {
// // attribute 키가 배열 형태가 아님
// var obj = {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"][layerIdx]["attribute"]
// = [ obj ];
// }
// } else {
// // filter키가 배열형태가 아님
// // 허용값이 입력되어있다면 값 변경 / 값은 위에 변수에 할당되어있음
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"] = [
// obj ];
// }
// } else {
// // filter 키가 설정되어있지 않음
// // 허용값이 입력되어있다면 값 변경
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["figure"] = [
// obj ];
// }
// }
// } else {
// // 해당 검수항목이 설정되어 있지 않음
// // 릴레이션임
// if (sec) {
// // 없다면
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [
// nameElem ];
// } else {
// // 해당 검수 항목이 설정되어 있지 않음
// // 허용값이 입력되어있다면 값 변경
// if (Array.isArray(attrValues) && attrValues.length === 1 && attrValues[0] ===
// "" ? false : true) {
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// var filterObj = [ obj ];
// var optionObj = {
// "figure" : filterObj
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias] = optionObj;
// }
// }
// }
// } else {
// // 해당 검수 타입이 설정되어 있지 않음
// if (sec) {
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "figure" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3] = {};
// strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [
// nameElem ];
//
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [
// obj ];
// } else {
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// var filterObj = [ obj ];
// var optionObj = {
// "figure" : filterObj
// };
// var typeObj = {};
// typeObj[this.nowOption.alias] = optionObj;
// strc["definition"][i]["options"][type3] = typeObj;
// }
// }
// }
// }
// }
// // 정의에 해당 분류가 없음
// if (!isExist) {
// // 릴레이션 설정임
// if (sec) {
// // 해당 검수 타입이 설정되어 있지 않음
// // 허용값이 입력되어있다면 값 변경
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// var optionsObj = [ {
// "name" : this.nowRelationCategory,
// "figure" : [ obj ]
// } ];
//
// var typeObj = {};
// typeObj[type3] = {};
// typeObj[type3][this.nowOption.alias] = {};
// typeObj[type3][this.nowOption.alias]["relation"] = optionsObj;
//
// var definitionObj = {
// "name" : this.nowCategory,
// "options" : typeObj
// };
// this.getStructure()["definition"].push(definitionObj);
// } else {
// // 릴레이션 설정 아님
// // 해당 검수 타입이 설정되어 있지 않음
// // 허용값이 입력되어있다면 값 변경
// var obj = {
// "code" : layerCode,
// "attribute" : [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// "number" : number !== null && number !== undefined ? number !== "" ? number :
// null : null,
// "condition" : typeof condition === "string" ? condition : null,
// "interval" : isNaN(interval) ? null : interval
// } ]
// };
// var optionsObj = {
// "figure" : [ obj ]
// };
// var typeObj = {};
// typeObj[type3] = {};
// typeObj[type3][this.nowOption.alias] = optionsObj;
//
// var definitionObj = {
// "name" : this.nowCategory,
// "options" : typeObj
// };
// this.getStructure()["definition"].push(definitionObj);
// }
// }
// }
// }
/**
 * 필터 조건의 허용값을 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#inputFilterValues
 * @param {HTMLElement}
 *            inp - 허용값 입력 폼 객체
 */
gb.validation.OptionDefinition.prototype.inputFilterValues = function(inp) {
	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];
	// 필터 인덱스
	var filterIdx = $(inp).parents().eq(1).index();
	// 레이어 인덱스
	var layerIdx = $(inp).parents().eq(4).index();
	// 레이어 코드
	var layerCode = null;
	if (!$(inp).parents().eq(4).find(".gb-optiondefinition-select-filtercode").prop("disabled")) {
		layerCode = $(inp).parents().eq(4).find(".gb-optiondefinition-select-filtercode option").filter(":selected").attr("geom") === "none" ? null
				: $(inp).parents().eq(4).find(".gb-optiondefinition-select-filtercode").val();
	}
	// 속성명
	var attrKey = null;
	if (!$(inp).parents().eq(1).find(".gb-optiondefinition-input-filterkey").prop("disabled")) {
		attrKey = $(inp).parents().eq(1).find(".gb-optiondefinition-input-filterkey").val().trim();
		// attrKey =
		// $(inp).parents().eq(1).find(".gb-optiondefinition-input-filterkey").val().replace(/(\s*)/g,
		// '');
	}
	// 허용값
	var attrValues = null;
	if (!$(inp).parents().eq(1).find(".gb-optiondefinition-input-filtervalues").prop("disabled")) {
		attrValues = $(inp).parents().eq(1).find(".gb-optiondefinition-input-filtervalues").val().split(",");
		// attrValues =
		// $(inp).parents().eq(1).find(".gb-optiondefinition-input-filtervalues").val().replace(/(\s*)/g,
		// '').split(",");
		for (var i = 0; i < attrValues.length; i++) {
			attrValues[i] = attrValues[i].trim();
		}
	}

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var isAllCat = false;
	if (this.nowRelationCategory === null) {
		isAllCat = true;
	}

	var strc = this.getStructure();
	if (Array.isArray(strc["definition"])) {
		var isExist = false;
		// definition에서 현재 분류를 찾는다
		for (var i = 0; i < strc["definition"].length; i++) {
			if (strc["definition"][i]["name"] === this.nowCategory) {
				isExist = true;
				// options 키를 가지고 있는지?
				if (strc["definition"][i].hasOwnProperty("options")) {
					// 검수 타입이 설정 되어있는지
					if (strc["definition"][i]["options"].hasOwnProperty(type3)) {
						// 해당 검수 항목이 설정되어 있는지
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								continue;
							}
							// 현재 입력한 값이 릴레이션 필터 값인지?
							if (sec) {
								// 현재 옵션에 릴레이션 키가 있는지?
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
									// 있다면
									// 배열인지?
									if (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"])) {
										var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
										// 모든 분류에 필터값을 설정할건지
										if (isAllCat) {
											var layerDef = this.getLayerDefinition().getStructure();
											console.log(attrValues);
											// 모든 레이어 정의에있는 분류와
											for (var a = 0; a < layerDef.length; a++) {
												var isExist = false;
												var existIdx;
												// 현재 릴레이션에 있는 분류를 비교해서
												for (var b = 0; b < rel.length; b++) {
													// 같은게 있는지
													if(layerDef[a]["name"] === rel[b]["name"]){
														// 같은 분류가 존재함
														isExist = true;
														// 같은 분류의 인덱스
														existIdx = b;
														break;
													}
												}
												// 전체 레이어 정의 분류와 릴레이션 레이어 분류와
												// 같은게 있을때
												if (isExist) {
													// 해당 릴레이션의 인덱스로 객체를 특정하고
													var erel = rel[existIdx];
													// 필터 키 객체 꺼내기
													var filterArr = erel["filter"];
													// 레이어 코드는 널로 입력
													var code = null;
													// 속성 배열
													var attribute = [];
													// 입력 폼 영역
													var filterArea = $(inp).parents().eq(2);
													// 각 필터 폼 별 행 가져오기
													var rows = $(filterArea).find(".row");
													// 각 행별로
													for (var c = 0; c < rows.length; c++) {
														var row = rows[c];
														// 속성명 가져오기
														var attrName = $(row).find(".gb-optiondefinition-input-filterkey").val();
														// 빈 속성명 값은 재끼기
// if (attrName === "") {
// continue;
// }
														// 속성값 가져오기
														var attrValues = $(row).find(".gb-optiondefinition-input-filtervalues").val().split(",");
														// 객체로 만들어서
														var attrObj = {
																"key" : attrName,
																"values" : attrValues 
														}; 
														// 배열에 넣기
														attribute[c] = attrObj;
													}
													// 필터 객체로 만들어서
													var filterObj = {
															"code" : code,
															"attribute" : attribute
													};
													// 필터 배열에 넣기
													erel["filter"] = [filterObj];
												} else {
													// 릴레이션 배열에 없을때
													// 없는 이름을 가져오기
													var nrel = layerDef[a]["name"];
													// 모든 레이어코드는 널로 입력
													var code = null;
													var attribute = [];
													var filterArea = $(inp).parents().eq(2);
													var rows = $(filterArea).find(".row");
													for (var c = 0; c < rows.length; c++) {
														var row = rows[c];
														var attrName = $(row).find(".gb-optiondefinition-input-filterkey").val();
														// 빈 속성명 값은 재끼기
// if (attrName === "") {
// continue;
// }
														var attrValues = $(row).find(".gb-optiondefinition-input-filtervalues").val().split(",");
														var attrObj = {
																"key" : attrName,
																"values" : attrValues 
														}; 
														attribute[c] = attrObj;
													}
													var filterObj = {
															"code" : null,
															"attribute" : attribute
													}
													var filterArr = [filterObj];
													var relObj = {
															"name" : nrel,
															"filter" : filterArr
													};
													// 릴레이션 배열에 푸시
													rel.push(relObj);
												}
											}
										} else {
											var isExist = false;
											for (var a = 0; a < rel.length; a++) {
												// 필터키 안에 분류 이름이 현재 릴레이션 분류 이름과
												// 같다면
												if (rel[a]["name"] === this.nowRelationCategory) {
													isExist = true;
													var filterKey;
													if (!rel[a].hasOwnProperty("filter")) {
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["filter"] = [];
													}
													filterKey = rel[a]["filter"];
													// 필터가 배열인지?
													if (!Array.isArray(filterKey)) {
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["filter"] = [];
													}
													var filterElem = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["filter"][layerIdx];
													// 현재 레이어 인덱스에 값이
													// 없으면
													if (filterElem === undefined) {
														// 빈 객체 생성
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["filter"][layerIdx] = {};
														filterElem = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["filter"][layerIdx];
													}
													// 필터 배열 원소에
													// attribute
													// 키가 있는지?
													if (!filterElem.hasOwnProperty("attribute")) {
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["filter"][layerIdx]["attribute"] = [];
													}
													// attribute 키가
													// 배열인지?
													if (!Array.isArray(filterElem["attribute"])) {
														strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["filter"][layerIdx]["attribute"] = [];
													}
													strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["filter"][layerIdx]["code"] = layerCode;
													strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][a]["filter"][layerIdx]["attribute"][filterIdx] = {
															"key" : attrKey,
															"values" : Array.isArray(attrValues) ? attrValues : null,
													};

												}
											}
// if (!isExist) {
// var attrElem = [ {
// "key" : attrKey,
// "values" : Array.isArray(attrValues) ? attrValues : null,
// } ];
// var codeElem = {
// "code" : layerCode,
// "attribute" : attrElem
// };
// var nameElem = {
// "name" : this.nowRelationCategory,
// "filter" : [ codeElem ]
// };
// strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
// }
											if (!isExist) {
												var tup = $(inp).parents().eq(5);
												var wells = $(tup).find(".well");
												for (var a = 0; a < wells.length; a++) {
													var code = $(wells[a]).find(".gb-optiondefinition-select-filtercode").val();
													if ($(wells[a]).find(".gb-optiondefinition-select-figurecode").children('option').filter("option:selected").attr("geom") === "none") {
														code = null;
													}
													var relObj = {
															"name" : this.nowRelationCategory,
															"filter" : []
													};
													var farea = $(wells[a]).find(".gb-optiondefinition-filterarea");
													var fdetails = $(farea).find(".row");
													for (var b = 0; b < fdetails.length; b++) {
														var key = !$(fdetails[b]).find(".gb-optiondefinition-input-filterkey").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-filterkey").val() : null;
														var values = !$(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").val().split(",") : null;
														if(relObj["filter"][a] === undefined){
															relObj["filter"][a] = {};
														}
														relObj["filter"][a]["code"] = code;
														if(relObj["filter"][a]["attribute"] === undefined){
															relObj["filter"][a]["attribute"] = [];
														}
														relObj["filter"][a]["attribute"][b] = {
																"key" : key,
																"values" : Array.isArray(values) ? values : null
														};
													}
													strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(relObj);
												}
											}
										}
									} else {
										// 배열이 아니라면
										var attrElem = [ {
											"key" : attrKey,
											"values" : Array.isArray(attrValues) ? attrValues : null,
										} ];
										var codeElem = {
												"code" : layerCode,
												"attribute" : attrElem
										};
										var nameElem = {
												"name" : this.nowRelationCategory,
												"filter" : [ codeElem ]
										};
										strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(nameElem);
									}
								} else {
									// 현재 옵션에 릴레이션 키가
									// 없다면
									var attrElem = [ {
										"key" : attrKey,
										"values" : Array.isArray(attrValues) ? attrValues : null,
									} ];
									var codeElem = {
											"code" : layerCode,
											"attribute" : attrElem
									};
									var nameElem = {
											"name" : this.nowRelationCategory,
											"filter" : [ codeElem ]
									};
									strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [ nameElem ];
								}
								// 여기까지 릴레이션
							} else {
								// filter 키가 설정되어있는지?
								if (!strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("filter")) {
									strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"] = [];
								}
								if (!Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"])) {
									strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"] = [];	
								}
								var tup = $(inp).parents().eq(5);
								var wells = $(tup).find(".well");
								for (var a = 0; a < wells.length; a++) {
									var code = $(wells[a]).find(".gb-optiondefinition-select-filtercode").val();
									if ($(wells[a]).find(".gb-optiondefinition-select-filtercode").children('option').filter("option:selected").attr("geom") === "none") {
										code = null;
									}
									if (strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][a] === undefined) {
										strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][a] = {};	
									}
									strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][a]["code"] = code;
									if (strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][a]["attribute"] === undefined) {
										strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][a]["attribute"] = [];
									}
									var farea = $(wells[a]).find(".gb-optiondefinition-filterarea");
									var fdetails = $(farea).find(".row");
									for (var b = 0; b < fdetails.length; b++) {
										var key = !$(fdetails[b]).find(".gb-optiondefinition-input-filterkey").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-filterkey").val() : null;
										var values = !$(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").val().split(",") : null;
										strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][a]["attribute"][b] = {
												"key" : key,
												"values" : Array.isArray(values) ? values : null
										};
									}
								}
							}
						} else {
							if (sec) {
								// 없다면
								var attrElem = [ {
									"key" : attrKey,
									"values" : Array.isArray(attrValues) ? attrValues : null,
								} ];
								var codeElem = {
										"code" : layerCode,
										"attribute" : attrElem
								};
								var nameElem = {
										"name" : this.nowRelationCategory,
										"filter" : [ codeElem ]
								};
								strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
								strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [ nameElem ];
							} else {
								// 해당 검수 항목이 설정되어 있지 않음
								// 속성명이 입력되어있다면 값 변경
								var key = $(inp).parents().eq(1).find(".gb-optiondefinition-input-filterkey").val();
								if (key !== undefined && key !== "") {
									var obj = {
											"code" : layerCode,
											"attribute" : [ {
												"key" : attrKey,
												"values" : $(inp).val().split(",")
												// "values" :
												// $(inp).val().replace(/(\s*)/g,
												// '').split(",")
											} ]
									};
									var attrValues = obj.attribute.values;
									for (var z = 0; z < attrValues.length; z++) {
										attrValues[z] = attrValues[z].trim();
									}
									var filterObj = [ obj ];
									var optionObj = {
											"filter" : filterObj
									};
									strc["definition"][i]["options"][type3][this.nowOption.alias] = optionObj;
								}
							}
						}
					} else {
						// 해당 검수 타입이 설정되어 있지 않음
						// 속성명이 입력되어있다면 값 변경
						if (sec) {
							var attrElem = [ {
								"key" : attrKey,
								"values" : Array.isArray(attrValues) ? attrValues : null,
							} ];
							var codeElem = {
									"code" : layerCode,
									"attribute" : attrElem
							};
							var nameElem = {
									"name" : this.nowRelationCategory,
									"filter" : [ codeElem ]
							};
							strc["definition"][i]["options"][type3] = {};
							strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
							strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [ nameElem ];

							strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [ obj ];
						} else {
							var key = $(inp).parents().eq(1).find(".gb-optiondefinition-input-filterkey").val();
							if (key !== undefined && key !== "") {
								var obj = {
										"code" : layerCode,
										"attribute" : [ {
											"key" : attrKey,
											"values" : $(inp).val().split(",")
											// "values" :
											// $(inp).val().replace(/(\s*)/g,
											// '').split(",")
										} ]
								};
								var attrValues = obj.attribute.values;
								for (var z = 0; z < attrValues.length; z++) {
									attrValues[z] = attrValues[z].trim();
								}
								var filterObj = [ obj ];
								var optionObj = {
										"filter" : filterObj
								};
								var typeObj = {};
								typeObj[this.nowOption.alias] = optionObj;
								strc["definition"][i]["options"][type3] = typeObj;
							}
						}
					}
				}
			}
		}
	}
}
/**
 * 필터 조건의 속성명을 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#inputFilterKey
 * @param {HTMLElement}
 *            inp - 속성명 입력 폼 객체
 */
gb.validation.OptionDefinition.prototype.inputFilterKey = function(inp) {
	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];
	// 필터 인덱스
	var filterIdx = $(inp).parents().eq(1).index();
	// 레이어 인덱스
	var layerIdx = $(inp).parents().eq(4).index();
	// 레이어 코드
	var layerCode = null;
	if (!$(inp).parents().eq(4).find(".gb-optiondefinition-select-filtercode").prop("disabled")) {
		layerCode = $(inp).parents().eq(4).find(".gb-optiondefinition-select-filtercode option").filter(":selected").attr("geom") === "none" ? null
				: $(inp).parents().eq(4).find(".gb-optiondefinition-select-filtercode").val();
	}
	// 속성명
	var attrKey = null;
	if (!$(inp).prop("disabled")) {
		attrKey = $(inp).val().trim();
		// attrKey = $(inp).val().replace(/(\s*)/g, '');
	}
	// 허용값
	var attrValues = null;
	if (!$(inp).parents().eq(1).find(".gb-optiondefinition-input-filtervalues").prop("disabled")) {
		attrValues = $(inp).parents().eq(1).find(".gb-optiondefinition-input-filtervalues").val().split(",");
		// attrValues =
		// $(inp).parents().eq(1).find(".gb-optiondefinition-input-filtervalues").val().replace(/(\s*)/g,
		// '').split(",");
		for (var z = 0; z < attrValues.length; z++) {
			attrValues[z] = attrValues[z].trim();
		}
	}
	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}
	var isAllCat = false;
	if (this.nowRelationCategory === null) {
		isAllCat = true;
	}
	var strc = this.getStructure();
	if (Array.isArray(strc["definition"])) {
		var isExist1 = false;
		// definition에서 현재 분류를 찾는다
		for (var i = 0; i < strc["definition"].length; i++) {
			if (strc["definition"][i]["name"] === this.nowCategory) {
				isExist1 = true;
				// options 키를 가지고 있는지?
				if (strc["definition"][i].hasOwnProperty("options")) {
					// 검수 타입이 설정 되어있는지
					if (!strc["definition"][i]["options"].hasOwnProperty(type3)) {
						strc["definition"][i]["options"][type3] = {};
						strc["definition"][i]["options"][type3]["run"] = true;
					}
					// 해당 검수 항목이 설정되어 있는지
					if (!strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
						strc["definition"][i]["options"][type3][this.nowOption.alias] = {};
						strc["definition"][i]["options"][type3][this.nowOption.alias]["run"] = true;
					}	
					// 현재 입력한 값이 릴레이션 필터 값인지?
					if (sec) {
						// 현재 옵션에 릴레이션 키가 있는지?
						if (!strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
							strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [];
						}
						// 현재 옵션에 릴레이션 키가 있다면 배열인지?
						if (!Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"])) {
							// 배열이 아니라면
							strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"] = [];
						}
						var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
						// 현재 옵션을 모든 분류에 적용할 것인지
						if (isAllCat) {
							var layerDef = this.getLayerDefinition().getStructure();
							console.log(attrValues);
							// 모든 레이어 정의에있는 분류와
							for (var a = 0; a < layerDef.length; a++) {
								var isExist2 = false;
								var existIdx;
								// 현재 릴레이션에 있는 분류를 비교해서
								for (var b = 0; b < rel.length; b++) {
									// 같은게 있는지
									if(layerDef[a]["name"] === rel[b]["name"]){
										// 같은 분류가 존재함
										isExist2 = true;
										// 같은 분류의 인덱스
										existIdx = b;
										break;
									}
								}
								// 전체 레이어 정의 분류와 릴레이션 레이어 분류와
								// 같은게 있을때
								if (isExist2) {
									// 해당 릴레이션의 인덱스로 객체를 특정하고
									var erel = rel[existIdx];
									if (erel === undefined) {
										rel[existIdx] = {};
									}
									// 필터 키 객체 꺼내기
									var filterArr = erel["filter"];
									if (filterArr === undefined || !Array.isArray(filterArr)) {
										erel["filter"] = [];
									}
									// 레이어 코드는 널로 입력
									var code = null;
									// 속성 배열
									var attribute = [];
									// 입력 폼 영역
									var filterArea = $(inp).parents().eq(2);
									// 각 필터 폼 별 행 가져오기
									var rows = $(filterArea).find(".row");
									// 각 행별로
									for (var c = 0; c < rows.length; c++) {
										var row = rows[c];
										// 속성명 가져오기
										var attrName = $(row).find(".gb-optiondefinition-input-filterkey").val();
										// 빈 속성명 값은 재끼기
// if (attrName === "") {
// continue;
// }
										// 속성값 가져오기
										var attrValues = $(row).find(".gb-optiondefinition-input-filtervalues").val().split(",");
										for (var d = 0; d < attrValues.length; d++) {
											attrValues[d] = attrValues[d].trim(); 
										}
										if (attrValues.length === 1 && attrValues[0] === "") {
											attrValues = null;
										}
										// 객체로 만들어서
										var attrObj = {
												"key" : attrName,
												"values" : attrValues 
										}; 
										// 배열에 넣기
										attribute[c] = attrObj;
									}
									// 필터 객체로 만들어서
									var filterObj = {
											"code" : code,
											"attribute" : attribute
									};
									// 필터 배열에 넣기
									erel["filter"] = [filterObj];
								} else {
									// 릴레이션 배열에 없을때
									// 없는 이름을 가져오기
									var nrel = layerDef[a]["name"];
									// 모든 레이어코드는 널로 입력
									var code = null;
									var attribute = [];
									var filterArea = $(inp).parents().eq(2);
									var rows = $(filterArea).find(".row");
									for (var c = 0; c < rows.length; c++) {
										var row = rows[c];
										var attrName = $(row).find(".gb-optiondefinition-input-filterkey").val();
										// 빈 속성명 값은 재끼기
// if (attrName === "") {
// continue;
// }
										var attrValues = $(row).find(".gb-optiondefinition-input-filtervalues").val().split(",");
										for (var d = 0; d < attrValues.length; d++) {
											attrValues[d] = attrValues[d].trim(); 
										}
										if (attrValues.length === 1 && attrValues[0] === "") {
											attrValues = null;
										}
										var attrObj = {
												"key" : attrName,
												"values" : attrValues 
										}; 
										attribute[c] = attrObj;
									}
									var filterObj = {
											"code" : null,
											"attribute" : attribute
									}
									var filterArr = [filterObj];
									var relObj = {
											"name" : nrel,
											"filter" : filterArr
									};
									// 릴레이션 배열에 푸시
									rel.push(relObj);
								}
							}
						} else {
							// 현재 옵션을 특정 분류에 적용할 것인지
							var isExist3 = false;
							for (var r = 0; r < rel.length; r++) {
								// 필터키 안에 분류 이름이 현재 릴레이션 분류 이름과
								// 같다면
								if (rel[r]["name"] === this.nowRelationCategory) {
									isExist3 = true;
									if (!rel[r].hasOwnProperty("filter")) {
										rel[r]["filter"] = [];
									}
									// filter 키가 설정되어있는지?
									if (!strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("filter")) {
										strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][r]["filter"] = [];
									}
									if (!Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"])) {
										strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][r]["filter"] = [];	
									}
									var tup = $(inp).parents().eq(5);
									var wells = $(tup).find(".well");
									for (var a = 0; a < wells.length; a++) {
										var code = $(wells[a]).find(".gb-optiondefinition-select-filtercode").val();
										if ($(wells[a]).find(".gb-optiondefinition-select-filtercode").children('option').filter("option:selected").attr("geom") === "none") {
											code = null;
										}
										if (strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][r]["filter"][a] === undefined) {
											strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][r]["filter"][a] = {};	
										}
										strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][r]["filter"][a]["code"] = code;
										if (strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][r]["filter"][a]["attribute"] === undefined || !Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][r]["filter"][a]["attribute"])) {
											strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][r]["filter"][a]["attribute"] = [];
										}
										var farea = $(wells[a]).find(".gb-optiondefinition-filterarea");
										var fdetails = $(farea).find(".row");
										for (var b = 0; b < fdetails.length; b++) {
											var key = !$(fdetails[b]).find(".gb-optiondefinition-input-filterkey").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-filterkey").val() : null;
											var formValues = $(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").val().split(",");
											var values = !$(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
											strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][r]["filter"][a]["attribute"][b] = {
													"key" : key,
													"values" : Array.isArray(values) ? values : null
											};
										}
									}
								}
							}
							if (!isExist3) {
								var tup = $(inp).parents().eq(5);
								var wells = $(tup).find(".well");
								for (var a = 0; a < wells.length; a++) {
									var code = $(wells[a]).find(".gb-optiondefinition-select-filtercode").val();
									if ($(wells[a]).find(".gb-optiondefinition-select-filtercode").children('option').filter("option:selected").attr("geom") === "none") {
										code = null;
									}
									var relObj = {
											"name" : this.nowRelationCategory,
											"filter" : []
									};
									var farea = $(wells[a]).find(".gb-optiondefinition-filterarea");
									var fdetails = $(farea).find(".row");
									for (var b = 0; b < fdetails.length; b++) {
										var key = !$(fdetails[b]).find(".gb-optiondefinition-input-filterkey").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-filterkey").val() : null;
										var formValues = $(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").val().split(",");
										var values = !$(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
										if(relObj["filter"][a] === undefined){
											relObj["filter"][a] = {};
										}
										relObj["filter"][a]["code"] = code;
										if(relObj["filter"][a]["attribute"] === undefined){
											relObj["filter"][a]["attribute"] = [];
										}
										relObj["filter"][a]["attribute"][b] = {
												"key" : key,
												"values" : Array.isArray(values) ? values : null
										};
									}
									strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"].push(relObj);
								}
							}
						}
						// 여기까지 릴레이션
					} else {
						// filter 키가 설정되어있는지?
						if (!strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("filter")) {
							strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"] = [];
						}
						if (!Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"])) {
							strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"] = [];	
						}
						var tup = $(inp).parents().eq(5);
						var wells = $(tup).find(".well");
						for (var a = 0; a < wells.length; a++) {
							var code = $(wells[a]).find(".gb-optiondefinition-select-filtercode").val();
							if ($(wells[a]).find(".gb-optiondefinition-select-filtercode").children('option').filter("option:selected").attr("geom") === "none") {
								code = null;
							}
							if (strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][a] === undefined) {
								strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][a] = {};	
							}
							strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][a]["code"] = code;
							if (strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][a]["attribute"] === undefined || !Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][a]["attribute"])) {
								strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][a]["attribute"] = [];
							}
							var farea = $(wells[a]).find(".gb-optiondefinition-filterarea");
							var fdetails = $(farea).find(".row");
							for (var b = 0; b < fdetails.length; b++) {
								var key = !$(fdetails[b]).find(".gb-optiondefinition-input-filterkey").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-filterkey").val() : null;
								var formValues = $(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").val().split(",");
								var values = !$(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
								strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][a]["attribute"][b] = {
										"key" : key,
										"values" : Array.isArray(values) ? values : null
								};
							}
						}
					}
				}
			}
		}
		// 정의에 해당 분류가 없음
		if (!isExist1) {
			// 릴레이션 설정임
			if (sec) {
				if (isAllCat) {
					var layerDef = this.getLayerDefinition().getStructure();
					console.log(attrValues);

					var optionsObj = [];

					var typeObj = {};
					typeObj[type3] = {};
					typeObj[type3]["run"] = true;
					typeObj[type3][this.nowOption.alias] = {};
					typeObj[type3][this.nowOption.alias]["run"] = true;
					typeObj[type3][this.nowOption.alias]["relation"] = optionsObj;

					for (var i = 0; i < layerDef.length; i++) {
						var name = layerDef[i].name;

						var code = null;
						var attribute = [];
						var filterArea = $(inp).parents().eq(2);
						var rows = $(filterArea).find(".row");
						for (var c = 0; c < rows.length; c++) {
							var row = rows[c];
							var attrName = $(row).find(".gb-optiondefinition-input-filterkey").val();
							// 빈 속성명 값은 재끼기
// if (attrName === "") {
// continue;
// }
							var attrValues = $(row).find(".gb-optiondefinition-input-filtervalues").val().split(",");
							for (var d = 0; d < attrValues.length; d++) {
								attrValues[d] = attrValues[d].trim(); 
							}
							var attrObj = {
									"key" : attrName,
									"values" : attrValues
							};
							attribute[c] = attrObj;
						}
						var filterObj = {
								"code" : null,
								"attribute" : attribute
						}
						var filterArr = [filterObj];
						var relObj = {
								"name" : name,
								"filter" : filterArr
						};
						optionsObj.push(relObj);
					}
					var definitionObj = {
							"name" : this.nowCategory,
							"options" : typeObj
					};
					this.getStructure()["definition"].push(definitionObj);
				} else {
					// 해당 검수 타입이 설정되어 있지 않음
					// 허용값이 입력되어있다면 값 변경
					var optionsObj = [ {
						"name" : this.nowRelationCategory,
						"filter" : []
					} ];

					var typeObj = {};
					typeObj[type3] = {};
					typeObj[type3]["run"] = true;
					typeObj[type3][this.nowOption.alias] = {};
					typeObj[type3][this.nowOption.alias]["run"] = true;
					typeObj[type3][this.nowOption.alias]["relation"] = optionsObj;

					var tup = $(inp).parents().eq(5);
					var wells = $(tup).find(".well");
					for (var a = 0; a < wells.length; a++) {
						var code = $(wells[a]).find(".gb-optiondefinition-select-filtercode").val();
						if ($(wells[a]).find(".gb-optiondefinition-select-filtercode").children('option').filter("option:selected").attr("geom") === "none") {
							code = null;
						}
						if (typeObj[type3][this.nowOption.alias]["relation"][0]["filter"][a] === undefined) {
							typeObj[type3][this.nowOption.alias]["relation"][0]["filter"][a] = {};	
						}
						typeObj[type3][this.nowOption.alias]["relation"][0]["filter"][a]["code"] = code;
						if (typeObj[type3][this.nowOption.alias]["relation"][0]["filter"][a]["attribute"] === undefined) {
							typeObj[type3][this.nowOption.alias]["relation"][0]["filter"][a]["attribute"] = [];
						}
						var farea = $(wells[a]).find(".gb-optiondefinition-filterarea");
						var fdetails = $(farea).find(".row");
						for (var b = 0; b < fdetails.length; b++) {
							var key = !$(fdetails[b]).find(".gb-optiondefinition-input-filterkey").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-filterkey").val() : null;
							var formValues = $(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").val().split(",");
							var values = !$(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
							typeObj[type3][this.nowOption.alias]["relation"][0]["filter"][a]["attribute"][b] = {
									"key" : key,
									"values" : Array.isArray(values) ? values : null
							};
						}
					}

					var definitionObj = {
							"name" : this.nowCategory,
							"options" : typeObj
					};
					this.getStructure()["definition"].push(definitionObj);
				}
			} else {
				// 릴레이션 설정 아님
				// 해당 검수 타입이 설정되어 있지 않음
				// 허용값이 입력되어있다면 값 변경
				var optionsObj = {
						"filter" : [],
						"run" : true
				};
				var typeObj = {};
				typeObj[type3] = {};
				typeObj[type3]["run"] = true;
				typeObj[type3][this.nowOption.alias] = optionsObj;

				var tup = $(inp).parents().eq(5);
				var wells = $(tup).find(".well");
				for (var a = 0; a < wells.length; a++) {
					var code = $(wells[a]).find(".gb-optiondefinition-select-filtercode").val();
					if ($(wells[a]).find(".gb-optiondefinition-select-filtercode").children('option').filter("option:selected").attr("geom") === "none") {
						code = null;
					}
					if (typeObj[type3][this.nowOption.alias]["filter"][a] === undefined) {
						typeObj[type3][this.nowOption.alias]["filter"][a] = {};	
					}
					typeObj[type3][this.nowOption.alias]["filter"][a]["code"] = code;
					if (typeObj[type3][this.nowOption.alias]["filter"][a]["attribute"] === undefined) {
						typeObj[type3][this.nowOption.alias]["filter"][a]["attribute"] = [];
					}
					var farea = $(wells[a]).find(".gb-optiondefinition-filterarea");
					var fdetails = $(farea).find(".row");
					for (var b = 0; b < fdetails.length; b++) {
						var key = !$(fdetails[b]).find(".gb-optiondefinition-input-filterkey").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-filterkey").val() : null;
						var formValues = $(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").val().split(",");
						var values = !$(fdetails[b]).find(".gb-optiondefinition-input-filtervalues").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
						typeObj[type3][this.nowOption.alias]["filter"][a]["attribute"][b] = {
								"key" : key,
								"values" : Array.isArray(values) ? values : null
						};
					}
				}

				var definitionObj = {
						"name" : this.nowCategory,
						"options" : typeObj
				};
				this.getStructure()["definition"].push(definitionObj);
			}
		}
	}
}
/**
 * 필터 조건의 속성명을 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#inputFilterKeyForNone
 * @param {HTMLElement}
 *            inp - 속성명 입력 폼 객체
 */
gb.validation.OptionDefinition.prototype.inputFilterKeyForNone = function(inp) {
	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];
	// 필터 인덱스
	var filterIdx = $(inp).parents().eq(1).index();

	// 속성명
	var attrKey = null;
	if (!$(inp).prop("disabled")) {
		attrKey = $(inp).val().trim();
	}
	// 허용값
	var attrValues = null;
	if (!$(inp).parents().eq(1).find(".gb-optiondefinition-input-filtervalues-fornone").prop("disabled")) {
		attrValues = $(inp).parents().eq(1).find(".gb-optiondefinition-input-filtervalues-fornone").val().split(",");
		for (var z = 0; z < attrValues.length; z++) {
			attrValues[z] = attrValues[z].trim();
		}
	}
	var strc = this.getStructure();
	// filter 키가 설정되어있는지?
	if (!strc.hasOwnProperty("filter")) {
		strc["filter"] = {};
	}
	var tup = $(inp).parents().eq(5);
	var well = $(tup).find(".well");
	if (this.nowOption.alias === "FeatureFilter") {
		if (strc["filter"]["attribute"] === undefined || !Array.isArray(strc["filter"]["attribute"])) {
			strc["filter"]["attribute"] = [];	
		}	
		var farea = $(well).find(".gb-optiondefinition-filterarea");
		var fdetails = $(farea).find(".row");
		for (var b = 0; b < fdetails.length; b++) {
			var key = !$(fdetails[b]).find(".gb-optiondefinition-input-filterkey-fornone").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-filterkey-fornone").val() : null;
			var formValues = $(fdetails[b]).find(".gb-optiondefinition-input-filtervalues-fornone").val().split(",");
			var values = !$(fdetails[b]).find(".gb-optiondefinition-input-filtervalues-fornone").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
			strc["filter"]["attribute"][b] = {
					"key" : key,
					"values" : Array.isArray(values) ? values : null
			};
		}
	} else if (this.nowOption.alias === "EditingState") {
		if (strc["filter"]["state"] === undefined || !Array.isArray(strc["filter"]["state"])) {
			strc["filter"]["state"] = [];	
		}
		var farea = $(well).find(".gb-optiondefinition-filterarea");
		var fdetails = $(farea).find(".row");
		for (var b = 0; b < fdetails.length; b++) {
			var key = !$(fdetails[b]).find(".gb-optiondefinition-input-filterkey-fornone").prop("disabled") ? $(fdetails[b]).find(".gb-optiondefinition-input-filterkey-fornone").val() : null;
			var formValues = $(fdetails[b]).find(".gb-optiondefinition-input-filtervalues-fornone").val().split(",");
			var values = !$(fdetails[b]).find(".gb-optiondefinition-input-filtervalues-fornone").prop("disabled") ? formValues.length === 1 && formValues[0] === "" ? null : formValues : null;
			if (Array.isArray(values)) {
				for (var i = 0; i < values.length; i++) {
					values[i] = !isNaN(parseInt(values[i])) ? parseInt(values[i]) : null; 
				}				
			}
			strc["filter"]["state"][b] = {
					"key" : key,
					"values" : Array.isArray(values) ? values : null
			};
		}
	}
}
/**
 * 인자가 필요없는 검수 항목에 대한 조건을 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#setNoParamOption
 * @param {HTMLElement}
 *            check - 검수 수행 유무 체크박스 폼 객체
 * @param {boolean}
 *            all - 레이어 분류에 포함된 모든 레이어를 검사
 */
gb.validation.OptionDefinition.prototype.setNoParamOption = function(check, all) {
	var strc = this.getStructure();
	var def = strc["definition"];
	var optItem = this.optItem[this.nowOption.alias];
	var type3 = optItem["purpose"];

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}
	// 모든 분류 선택인지
	if (sec && all) {
		var layerDef = this.getLayerDefinition().getStructure();
		// 검수 옵션 객체의 definition이 배열인지?
		if (Array.isArray(def)) {
			// 베열안에 값이 있는지?
			var isExist = false;
			if (def.length > 0) {
				for (var i = 0; i < def.length; i++) {
					if (this.nowCategory === def[i].name) {
						isExist = true;
						// 분류안에 options 키가 있는지
						if (def[i].hasOwnProperty("options") && !!def[i]["options"]) {
							// 있음
							// 분류 안에 있는 options 키
							// def[i]["options"];
							// options 안에 그래픽, 애트리, 인접 키가 있는지?
							if (def[i]["options"].hasOwnProperty(type3) && !!def[i]["options"][type3]) {
								// 있을때
								// 키 안에 현재 검수 항목이 있는지?
								if (def[i]["options"][type3].hasOwnProperty(this.nowOption.alias) && !!def[i]["options"][type3][this.nowOption.alias]) {
									// 있을때
									// 체크박스가 체크되어 있는지?
									if ($(check).is(":checked")) {
										def[i]["options"][type3][this.nowOption.alias]["relation"] = [];
										if (Array.isArray(layerDef)) {
											for (var a = 0; a < layerDef.length; a++) {
												var obj = {
														"filter" : null
												};
												obj["figure"] = null;
												obj["tolerance"] = null;
												obj["name"] = layerDef[a].name;
												def[i]["options"][type3][this.nowOption.alias]["relation"].push(obj);
											}
										}
									} else {
										// 체크 안됨
										// 검수 항목 키 삭제
										if (def[i].hasOwnProperty("options")) {
											if (def[i]["options"].hasOwnProperty(type3)) {
												// 검수 옵션 항목이 있다면
												if (def[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
													// 릴레이션 키가 있다면
													if (def[i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
														if (Array.isArray(def[i]["options"][type3][this.nowOption.alias]["relation"])) {
															def[i]["options"][type3][this.nowOption.alias]["relation"] = [];
															var rel = def[i]["options"][type3][this.nowOption.alias]["relation"];
															if (rel.length === 0) {
																delete def[i]["options"][type3][this.nowOption.alias]["relation"];
															}
															var itemNames = Object.keys(def[i]["options"][type3][this.nowOption.alias]);
															if (itemNames.length === 0 || (itemNames.length === 1 && itemNames[0] === "run")) {
																delete def[i]["options"][type3][this.nowOption.alias];
															}
															var typeNames = Object.keys(def[i]["options"][type3]);
															if (typeNames.length === 0 || (typeNames.length === 1 && typeNames[0] === "run")) {
																delete def[i]["options"][type3];
															}
															var names = Object.keys(def[i]["options"]);
															if (names.length === 0) {
																def.splice(i, 1);
															}
														}
													} else {
														// 릴레이션 키가 없다면
													}
												}
											}
										}
									}
								} else {
									// 타입 키안에 현재 검수 옵션이
									// 없을때
									// 쳌박스 쳌됨
									if ($(check).is(":checked")) {
										// 쳌박스 쳌됨
										if (def[i]["options"][type3] === undefined) {
											def[i]["options"][type3] = {};
											def[i]["options"][type3]["run"] = true;
										}
										def[i]["options"][type3][this.nowOption.alias] = {
												"run" : true,
												"relation" : []
										};

										for (var a = 0; a < layerDef.length; a++) {
											var obj = {
													"filter" : null
											};
											obj["figure"] = null;
											obj["tolerance"] = null;
											obj["name"] = layerDef[a].name;
											def[i]["options"][type3][this.nowOption.alias]["relation"].push(obj);
										}
									} else {
										// 체크 안됨
										// 검수 항목 키 삭제
										def[i]["options"][type3][this.nowOption.alias]["relation"] = [];

									}
								}
							} else {
								// 옵션안에 애트리뷰트 그래픽 등의 키가
								// 없을때
								if ($(check).is(":checked")) {
									if (!def[i].hasOwnProperty("options") || !def[i]["options"]) {
										def[i]["options"] = {};
									}
									if (!def[i]["options"].hasOwnProperty(type3) || !def[i]["options"][type3]) {
										def[i]["options"][type3] = {};
										def[i]["options"][type3]["run"] = true;
									}
									if (!def[i]["options"][type3].hasOwnProperty(this.nowOption.alias) || !def[i]["options"][type3][this.nowOption.alias]) {
										def[i]["options"][type3][this.nowOption.alias] = {};
										def[i]["options"][type3][this.nowOption.alias]["run"] = true;
									}
									def[i]["options"][type3][this.nowOption.alias]["relation"] = [];

									for (var a = 0; a < layerDef.length; a++) {
										var obj = {
												"filter" : null
										};
										obj["figure"] = null;
										obj["tolerance"] = null;
										obj["name"] = layerDef[a].name;
									}
								} else {
									// 체크 안됨
									// 검수 항목 키 삭제
									if (def[i].hasOwnProperty("options")) {
										if (def[i]["options"].hasOwnProperty(type3)) {
											if (def[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
												if (def[i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
													delete def[i]["options"][type3][this.nowOption.alias]["relation"];
												}
											}
										}
									}
									var itemNames = Object.keys(def[i]["options"][type3][this.nowOption.alias]);
									if (itemNames.length === 0 || (itemNames.length === 1 && itemNames[0] === "run")) {
										delete def[i]["options"][type3][this.nowOption.alias];
									}
									var optionKeys = Object.keys(def[i]["options"][type3]);
									if (optionKeys.length === 0 || (optionKeys.length === 1 && optionKeys[0] === "run")) {
										delete def[i]["options"][type3];
									}
									var typeKeys = Object.keys(def[i]["options"]);
									if (typeKeys.length === 0) {
										delete def[i]["options"];
										def.splice(i, 1);
									}
								}
							}
						}
					}
				}
				if (isExist === false) {
					// definition을 다돌았지만 없었음 새로 입력
					if ($(check).is(":checked")) {
						// 체크함
						var outerObj = {
								"name" : this.nowCategory,
								"options" : {}
						};
						outerObj["options"][type3] = {};
						outerObj["options"][type3]["run"] = true;
						outerObj["options"][type3][this.nowOption.alias] = {
								"run" : true,
								"relation" : []
						};

						for (var a = 0; a < layerDef.length; a++) {
							var obj = {
									"filter" : null
							};
							obj["figure"] = null;
							obj["tolerance"] = null;
							obj["name"] = layerDef[a].name;
							outerObj["options"][type3][this.nowOption.alias]["relation"].push(obj);
						}
						this.getStructure()["definition"].push(outerObj);
					}
				}
			} else {
				// definition 키가
				// 배열은 맞는데 안에 값이 없음
				// 현재 체크박스를 체크했는지?
				if ($(check).is(":checked")) {
					// 체크함
					var outerObj = {
							"name" : this.nowCategory,
							"options" : {}
					};
					outerObj["options"][type3] = {};
					outerObj["options"][type3]["run"] = true;
					outerObj["options"][type3][this.nowOption.alias] = {
							"run" : true,
							"relation" : []
					};

					for (var a = 0; a < layerDef.length; a++) {
						var obj = {
								"filter" : null
						};
						obj["figure"] = null;
						obj["tolerance"] = null;
						obj["name"] = layerDef[a].name;
						outerObj["options"][type3][this.nowOption.alias]["relation"].push(obj);
					}
					this.getStructure()["definition"].push(outerObj);
				}
			}
		}
	} else {
		// 모든 분류 체크가 아님
		// 검수 옵션 객체의 definition이 배열인지?
		if (Array.isArray(def)) {
			// 베열안에 값이 있는지?
			var isExist = false;
			if (def.length > 0) {
				for (var i = 0; i < def.length; i++) {
					if (this.nowCategory === def[i].name) {
						isExist = true;
						// 분류안에 options 키가 있는지
						if (def[i].hasOwnProperty("options")) {
							// 있음
							// 분류 안에 있는 options 키
							// def[i]["options"];
							// options 안에 그래픽, 애트리, 인접 키가 있는지?
							if (def[i]["options"].hasOwnProperty(type3)) {
								// 있을때
								// 키 안에 현재 검수 항목이 있는지?
								if (def[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
									// 있을때
									// 체크박스가 체크되어 있는지?
									if ($(check).is(":checked")) {
										var obj = {
												"filter" : null
										};
										obj["figure"] = null;
										obj["tolerance"] = null;
										obj["relation"] = null;
										if (sec) {
											obj["name"] = this.nowRelationCategory;
											delete obj["relation"];
											if (def[i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
												if (!Array.isArray(def[i]["options"][type3][this.nowOption.alias]["relation"])) {
													def[i]["options"][type3][this.nowOption.alias]["relation"] = [];
												}
												def[i]["options"][type3][this.nowOption.alias]["relation"].push(obj);
											} else {
												if (def[i]["options"][type3][this.nowOption.alias] !== undefined) {
													def[i]["options"][type3][this.nowOption.alias]["relation"] = [ obj ];
													def[i]["options"][type3][this.nowOption.alias]["run"] = true;
												} else {
													def[i]["options"][type3][this.nowOption.alias] = {
															"relation" : [ obj ],
															"run" : true
													};
												}
											}
										} else {
											obj["run"] = true;
											def[i]["options"][type3][this.nowOption.alias] = obj;
										}
									} else {
										// 체크 안됨
										// 검수 항목 키 삭제
										if (sec) {
											if (def[i].hasOwnProperty("options")) {
												if (def[i]["options"].hasOwnProperty(type3)) {
													// 검수 옵션 항목이 있다면
													if (def[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
														// 릴레이션 키가 있다면
														if (def[i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
															if (Array.isArray(def[i]["options"][type3][this.nowOption.alias]["relation"])) {
																var rel = def[i]["options"][type3][this.nowOption.alias]["relation"];
																for (var j = 0; j < rel.length; j++) {
																	if (rel[j]["name"] === this.nowRelationCategory) {
																		def[i]["options"][type3][this.nowOption.alias]["relation"].splice(
																				j, 1);
																	}
																}
																if (rel.length === 0) {
																	delete def[i]["options"][type3][this.nowOption.alias]["relation"];
																}
																var itemNames = Object.keys(def[i]["options"][type3][this.nowOption.alias]);
																if (itemNames.length === 0 || (itemNames.length === 1 && itemNames[0] === "run")) {
																	delete def[i]["options"][type3][this.nowOption.alias];
																}
																var typeNames = Object.keys(def[i]["options"][type3]);
																if (typeNames.length === 0 || (typeNames.length === 1 && typeNames[0] === "run")) {
																	delete def[i]["options"][type3];
																}
																var names = Object.keys(def[i]["options"]);
																if (names.length === 0) {
																	def.splice(i, 1);
																}
															}
														} else {
															// 릴레이션 키가 없다면
														}
													}
												}
											}
										} else {
											if (def[i].hasOwnProperty("options")) {
												if (def[i]["options"].hasOwnProperty(type3)) {
													if (def[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
														delete def[i]["options"][type3][this.nowOption.alias];
													}
												}
											}
											var optionKeys = Object.keys(def[i]["options"][type3]);
											if (optionKeys.length === 0 || (optionKeys.length === 1 && optionKeys[0] === "run")) {
												delete def[i]["options"][type3];
											}
											var typeKeys = Object.keys(def[i]["options"]);
											if (typeKeys.length === 0) {
												delete def[i]["options"];
												def.splice(i, 1);
											}
										}
									}
								} else {
									// 타입 키안에 현재 검수 옵션이
									// 없을때
									// 쳌박스 쳌됨
									if ($(check).is(":checked")) {
										// 쳌박스 쳌됨
										var obj = {
												"filter" : null
										};
										obj["figure"] = null;
										obj["tolerance"] = null;
										obj["relation"] = null;
										if (sec) {
											obj["name"] = this.nowRelationCategory;
											delete obj["relation"];
											if (def[i]["options"][type3] === undefined) {
												def[i]["options"][type3] = {};
												def[i]["options"][type3]["run"] = true;
											}
											def[i]["options"][type3][this.nowOption.alias] = {
													"run" : true,
													"relation" : [ obj ]
											};
										} else {
											obj["run"] = true;
											def[i]["options"][type3][this.nowOption.alias] = obj;
										}
									} else {
										// 체크 안됨
										// 검수 항목 키 삭제
										if (sec) {

										} else {
											if (def[i].hasOwnProperty("options")) {
												if (def[i]["options"].hasOwnProperty(type3)) {
													if (def[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
														delete def[i]["options"][type3][this.nowOption.alias];
													}
												}
											}
											var optionKeys = Object.keys(def[i]["options"][type3]);
											if (optionKeys.length === 0 || (optionKeys.length === 1 && optionKeys[0] === "run")) {
												delete def[i]["options"][type3];
											}
											var typeKeys = Object.keys(def[i]["options"]);
											if (typeKeys.length === 0) {
												delete def[i]["options"];
												def.splice(i, 1);
											}
										}
									}
								}
							} else {
								// 옵션안에 애트리뷰트 그래픽 등의 키가
								// 없을때
								if ($(check).is(":checked")) {
									var obj = {
											"filter" : null
									};
									obj["figure"] = null;
									obj["tolerance"] = null;
									obj["relation"] = null;

									if (sec) {
										obj["name"] = this.nowRelationCategory;
										delete obj["relation"];
										if (!def[i].hasOwnProperty("options")) {
											def[i]["options"] = {};
										}
										if (!def[i]["options"].hasOwnProperty(type3)) {
											def[i]["options"][type3] = {};
											def[i]["options"][type3]["run"] = true;
										}
										if (!def[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
											def[i]["options"][type3][this.nowOption.alias] = {};
											def[i]["options"][type3][this.nowOption.alias]["run"] = true;
										}
										if (def[i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
											if (Array.isArray(def[i]["options"][type3][this.nowOption.alias]["relation"])) {
												def[i]["options"][type3][this.nowOption.alias]["relation"].push(obj);
											} else {
												def[i]["options"][type3][this.nowOption.alias]["relation"] = [ obj ];
											}
										} else {
											def[i]["options"][type3][this.nowOption.alias] = {
													"run" : true,
													"relation" : [ obj ]
											};
										}
									} else {
										if (def[i]["options"].hasOwnProperty(type3)) {
											if (def[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
												obj["run"] = true;
												def[i]["options"][type3][this.nowOption.alias] = obj;
											}
										} else {
											if (def[i]["options"][type3] === undefined) {
												def[i]["options"][type3] = {};
												def[i]["options"][type3]["run"] = true;
											}
											obj["run"] = true;
											def[i]["options"][type3][this.nowOption.alias] = obj;
										}
									}
								} else {
									// 체크 안됨
									// 검수 항목 키 삭제
									if (def[i].hasOwnProperty("options")) {
										if (def[i]["options"].hasOwnProperty(type3)) {
											if (def[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
												delete def[i]["options"][type3][this.nowOption.alias];
											}
										}
									}
									var optionKeys = Object.keys(def[i]["options"][type3]);
									if (optionKeys.length === 0 || (optionKeys.length === 1 && optionKeys[0] === "run")) {
										delete def[i]["options"][type3];
									}
									var typeKeys = Object.keys(def[i]["options"]);
									if (typeKeys.length === 0) {
										delete def[i]["options"];
										def.splice(i, 1);
									}
								}
							}
						}
					}
				}
				if (isExist === false) {
					// definition을 다돌았지만 없었음 새로 입력
					if ($(check).is(":checked")) {
						// 체크함
						var obj = {
								"filter" : null
						};
						obj["figure"] = null;
						obj["tolerance"] = null;
						obj["relation"] = null;

						if (sec) {
							obj["name"] = this.nowRelationCategory;
							delete obj["relation"];
							var outerObj = {
									"name" : this.nowCategory,
									"options" : {}
							};
							outerObj["options"][type3] = {};
							outerObj["options"][type3]["run"] = true;
							outerObj["options"][type3][this.nowOption.alias] = {
									"run" : true,
									"relation" : [ obj ]
							}
						} else {
							var type3Obj = {};
							type3Obj["run"] = true;
							obj["run"] = true;
							type3Obj[this.nowOption.alias] = obj;
							var options = {};
							options[type3] = type3Obj;
							var outerObj = {
									"name" : this.nowCategory
							};
							outerObj["options"] = options;
						}
						this.getStructure()["definition"].push(outerObj);
					}
				}
			} else {
				// definition 키가
				// 배열은 맞는데 안에 값이 없음
				// 현재 체크박스를 체크했는지?
				if ($(check).is(":checked")) {
					// 체크함
					var obj = {
							"filter" : null
					};
					obj["figure"] = null;
					obj["tolerance"] = null;
					obj["relation"] = null;

					if (sec) {
						obj["name"] = this.nowRelationCategory;
						delete obj["relation"];
						var outerObj = {
								"name" : this.nowCategory,
								"options" : {}
						};
						outerObj["options"][type3] = {};
						outerObj["options"][type3]["run"] = true;
						outerObj["options"][type3][this.nowOption.alias] = {
								"run" : true,
								"relation" : [ obj ]
						}
					} else {
						var type3Obj = {};
						type3Obj["run"] = true;
						obj["run"] = true;
						type3Obj[this.nowOption.alias] = obj;
						var options = {};
						options[type3] = type3Obj;
						var outerObj = {
								"name" : this.nowCategory
						};
						outerObj["options"] = options;
					}
					this.getStructure()["definition"].push(outerObj);
				}
			}
		}
	}
};

/**
 * 선택한 타입외 검수 세부 설정을 삭제한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#clearSettingForNone
 */
gb.validation.OptionDefinition.prototype.clearSettingForNone = function(){
	console.log(this.nowOption.alias);
	var ffilter = this.getStructure()["filter"];
	if (ffilter !== undefined) {
		var optItem = this.optItem[this.nowOption.alias];
		var btn = $("<button>").attr("value", this.nowOption.alias).text(optItem.title);
		if (this.nowOption.alias === "FeatureFilter") {
			this.getStructure()["filter"]["attribute"] = undefined;
		} else if (this.nowOption.alias === "EditingState") {
			this.getStructure()["filter"]["state"] = undefined;
		}
		this.printOptionCategory(btn, false);
	}
}

/**
 * 선택한 검수 세부 설정을 삭제한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#clearSetting
 * @param {string}
 *            type - 삭제할 조건
 */
gb.validation.OptionDefinition.prototype.clearSetting = function(type) {
	var that = this;
	var cat = this.getLayerDefinition().getStructure();
	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var isAllCat = false;
	if (this.nowRelationCategory === null) {
		isAllCat = true;
	}

	var category;
	if (sec) {
		category = this.nowRelationCategory;
		if (isAllCat) {
			var definition = this.getStructure()["definition"];
			if (Array.isArray(definition)) {
				for (var i = 0; i < definition.length; i++) {
					var name = definition[i].name;
					if (name === this.nowCategory) {
						// 검수 항목 정보
						var optItem = this.optItem[this.nowOption.alias];
						// 검수 타입
						var type3 = optItem["purpose"];
						var optionType = definition[i]["options"][type3];
						if (optionType !== undefined) {
							var keys = Object.keys(optionType);
							if (keys.indexOf(this.nowOption.alias) !== -1) {
								var relation = definition[i]["options"][type3][this.nowOption.alias]["relation"];
								if (Array.isArray(relation)) {
									for (var j = 0; j < relation.length; j++) {
										var filter = definition[i]["options"][type3][this.nowOption.alias]["relation"][j][type];
										if (filter !== undefined) {
											delete definition[i]["options"][type3][this.nowOption.alias]["relation"][j][type];
										}
										var keys2 = Object.keys(definition[i]["options"][type3][this.nowOption.alias]["relation"][j]);
										if (keys2.length === 1) {
											definition[i]["options"][type3][this.nowOption.alias]["relation"][j] = undefined;
										}
									}
									var isAllUndef = true;
									for (var j = 0; j < relation.length; j++) {
										if (relation[j] !== undefined) {
											isAllUndef = false;
										}										
									}
									if (isAllUndef) {
										delete definition[i]["options"][type3][this.nowOption.alias]["relation"];
									}
									var optionKeys = Object.keys(definition[i]["options"][type3][this.nowOption.alias]);
									if (optionKeys.length === 0 || (optionKeys.length === 1 && optionKeys[0] === "run")) {
										delete definition[i]["options"][type3][this.nowOption.alias];
									}
									var typeKeys = Object.keys(definition[i]["options"][type3]);
									if (typeKeys.length === 0 || (typeKeys.length === 1 && typeKeys[0] === "run")) {
										delete definition[i]["options"][type3];
									}
									var optionsKeys2 = Object.keys(definition[i]["options"]);
									if (optionsKeys2.length === 0) {
										delete definition[i]["options"];
									}
									var defObjKeys = Object.keys(definition[i]);
									if (defObjKeys.length === 0 || defObjKeys.length === 1) {
										definition.splice(i, 1);
										i--;
									}
								}
							}
						}
					}
				}
				var btn = $("<button>").addClass("gb-optiondefinition-btn-detailcategory");

				if (type === "filter") {
					$(btn).attr({
						"value" : "filter"
					}).text(that.translation.filterValidation[that.locale]);
				} else if (type === "figure") {
					$(btn).attr({
						"value" : "figure"
					}).text(that.translation.attrValidation[that.locale]);
				} else if (type === "tolerance") {
					$(btn).attr({
						"value" : "tolerance"
					}).text(that.translation.condValidation[that.locale]);
				} else if (type === "relation") {
					$(btn).attr({
						"value" : "relation"
					}).text(that.translation.layerRelation[that.locale]);
				}
				that.printDetailForm(btn, false, true, true);
			}
		} else {
			var definition = this.getStructure()["definition"];
			if (Array.isArray(definition)) {
				for (var i = 0; i < definition.length; i++) {
					var name = definition[i].name;
					if (name === this.nowCategory) {
						// 검수 항목 정보
						var optItem = this.optItem[this.nowOption.alias];
						// 검수 타입
						var type3 = optItem["purpose"];
						var optionType = definition[i]["options"][type3];
						if (optionType !== undefined) {
							var keys = Object.keys(optionType);
							if (keys.indexOf(this.nowOption.alias) !== -1) {
								var relation = definition[i]["options"][type3][this.nowOption.alias]["relation"];
								if (Array.isArray(relation)) {
									for (var j = 0; j < relation.length; j++) {
										var name = relation[j]["name"];
										if (name === this.nowRelationCategory) {
											var filter = definition[i]["options"][type3][this.nowOption.alias]["relation"][j][type];
											if (filter !== undefined) {
												delete definition[i]["options"][type3][this.nowOption.alias]["relation"][j][type];
											}
											var relKeys = Object.keys(definition[i]["options"][type3][this.nowOption.alias]["relation"][j]);
											if (relKeys.length === 1) {
												delete definition[i]["options"][type3][this.nowOption.alias]["relation"];
											}
											var keys2 = Object.keys(definition[i]["options"][type3][this.nowOption.alias]);
											if (keys2.length === 0 || (keys2.length === 1 && keys2[0] === "run")) {
												delete definition[i]["options"][type3][this.nowOption.alias];
											}
										}
									}
								}
							}
							var afterKeys = Object.keys(optionType);
							if (afterKeys.length === 0 || (afterKeys.length === 1 && afterKeys[0] === "run")) {
								delete definition[i]["options"][type3];
							}
							var optionsKeys = Object.keys(definition[i]["options"]);
							if (optionsKeys.length === 0) {
								delete definition[i]["options"];
							}
							var defObjKeys = Object.keys(definition[i]);
							if (defObjKeys.length === 0 || defObjKeys.length === 1) {
								definition.splice(i, 1);
								i--;
							}
						}
					}
				}
				var btn = $("<button>").addClass("gb-optiondefinition-btn-detailcategory");

				if (type === "filter") {
					$(btn).attr({
						"value" : "filter"
					}).text(that.translation.filterValidation[that.locale]);
				} else if (type === "figure") {
					$(btn).attr({
						"value" : "figure"
					}).text(that.translation.attrValidation[that.locale]);
				} else if (type === "tolerance") {
					$(btn).attr({
						"value" : "tolerance"
					}).text(that.translation.condValidation[that.locale]);
				} else if (type === "relation") {
					$(btn).attr({
						"value" : "relation"
					}).text(that.translation.layerRelation[that.locale]);
				}
				that.printDetailForm(btn, false);
			}
		}
	} else {
		category = this.nowCategory;
		var definition = this.getStructure()["definition"];
		if (Array.isArray(definition)) {
			for (var i = 0; i < definition.length; i++) {
				var name = definition[i].name;
				if (name === this.nowCategory) {
					// 검수 항목 정보
					var optItem = this.optItem[this.nowOption.alias];
					// 검수 타입
					var type3 = optItem["purpose"];
					var optionType = definition[i]["options"][type3];
					if (optionType !== undefined) {
						var keys = Object.keys(optionType);
						if (keys.indexOf(this.nowOption.alias) !== -1) {
							var filter = definition[i]["options"][type3][this.nowOption.alias][type];
							if (filter !== undefined) {
								delete definition[i]["options"][type3][this.nowOption.alias][type];
							}
							var keys2 = Object.keys(definition[i]["options"][type3][this.nowOption.alias]);
							if (keys2.length === 0 || (keys2.length === 1 && keys2[0] === "run")) {
								delete definition[i]["options"][type3][this.nowOption.alias];
							}
						}
						var afterKeys = Object.keys(optionType);
						if (afterKeys.length === 0 || (afterKeys.length === 1 && afterKeys[0] === "run")) {
							delete definition[i]["options"][type3];
						}
						var optionsKeys = Object.keys(definition[i]["options"]);
						if (optionsKeys.length === 0) {
							delete definition[i]["options"];
						}
						var defObjKeys = Object.keys(definition[i]);
						if (defObjKeys.length === 0 || defObjKeys.length === 1) {
							definition.splice(i, 1);
							i--;
						}
					}
				}
			}
			var btn = $("<button>").addClass("gb-optiondefinition-btn-detailcategory");

			if (type === "filter") {
				$(btn).attr({
					"value" : "filter"
				}).text(that.translation.filterValidation[that.locale]);
			} else if (type === "figure") {
				$(btn).attr({
					"value" : "figure"
				}).text(that.translation.attrValidation[that.locale]);
			} else if (type === "tolerance") {
				$(btn).attr({
					"value" : "tolerance"
				}).text(that.translation.condValidation[that.locale]);
			} else if (type === "relation") {
				$(btn).attr({
					"value" : "relation"
				}).text(that.translation.layerRelation[that.locale]);
			}
			that.printDetailForm(btn, false);
		}
	}

	console.log(cat);
	console.log(this.getStructure());
	console.log(this.nowCategory);
	console.log(this.nowOption);
	console.log(this.nowDetailCategory);
	console.log(this.nowRelationCategory);
	console.log(this.nowRelationDetailCategory);
};
/**
 * 필터 조건에 레이어 선택폼을 추가한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#addLayerCodeFilter
 * @param {HTMLElement}
 *            btn - 조건 추가 버튼 객체
 */
gb.validation.OptionDefinition.prototype.addLayerCodeFilter = function(btn) {
	var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.code[this.locale] + ":");
	var codeSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-filtercode");
	var cat = this.getLayerDefinition().getStructure();

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var category;
	if (sec) {
		category = this.nowRelationCategory;
	} else {
		category = this.nowCategory;
	}

	if (category === null) {
		var tup = $(btn).parents().eq(2).find(".gb-optiondefinition-tuplearea");
		var well = $(tup).find(".well");
		var isExist = false;
		for (var i = 0; i < well.length; i++) {
			var selec = $(well[i]).find(".gb-optiondefinition-select-filtercode");
			if ($(selec).children('option').filter("option:selected").attr("geom") === "none") {
				isExist = true;
				break;
			}
		}
		if (isExist) {
			this.setMessagePopup("danger", this.translation.nomoreadd[this.locale]);
			return;
		}
		var allCode = $("<option>").text(this.translation.applyAll[this.locale]).attr("geom", "none");
		$(codeSelect).append(allCode);
	} else if(category !== undefined) {
		var tup = $(btn).parents().eq(2).find(".gb-optiondefinition-tuplearea");
		var well = $(tup).find(".well");
		var isExist = false;
		for (var i = 0; i < well.length; i++) {
			var selec = $(well[i]).find(".gb-optiondefinition-select-filtercode");
			if ($(selec).children('option').filter("option:selected").attr("geom") === "none") {
				isExist = true;
				break;
			}
		}
		if (isExist) {
			this.setMessagePopup("danger", this.translation.nomoreadd[this.locale]);
			return;
		}
		if (Array.isArray(cat)) {
			for (var i = 0; i < cat.length; i++) {
				if (cat[i].name === category) {
					// 현재 분류의 레이어 코드
					var layers = cat[i].layers;
					// 레이어 코드 필터 영역
					var tup = $(btn).parents().eq(2).find(".gb-optiondefinition-tuplearea");
					// 추가한 코드들
					var well = $(tup).find(".well");
					// 모든 코드 개수랑 추가한 코드 개수가 같으면
					if (layers.length === well.length) {
						// 추가안함
						this.setMessagePopup("danger", this.translation.nomoreadd[this.locale]);
						return;
					}
					var allCode = $("<option>").text(this.translation.applyAll[this.locale]).attr("geom", "none");
					$(codeSelect).append(allCode);
					for (var j = 0; j < layers.length; j++) {
						var option = $("<option>").text(layers[j].code).attr("geom", layers[j].geometry);
						$(codeSelect).append(option);
						// 중복 확인
						var isExist = false;
						for (var k = 0; k < well.length; k++) {
							var selec = $(well[k]).find(".gb-optiondefinition-select-filtercode");
							if ($(selec).children('option').filter("option:selected").attr("geom") !== "none" && $(selec).children('option').filter("option:selected").text() === layers[j].code) {
								isExist = true;
								break;
							}
						}
						if (!isExist) {
							$(option).prop("selected", true);
						}
						// 중복 확인
					}
				}
			}
		}	
	}

	var codeCol2 = $("<div>").addClass("col-md-7").append(codeSelect);

	var delBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-deletelayerfilter").text(
			this.translation.deleteLayerCode[this.locale]).addClass("gb-optiondefinition-btn-with100");
	var delBtnCol = $("<div>").addClass("col-md-2").append(delBtn);

	var addBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-addfilter").addClass("gb-optiondefinition-btn-with100").text(this.translation.addFilter[this.locale]);
	var addBtnCol = $("<div>").addClass("col-md-2").append(addBtn);

	var addFilterRow = $("<div>").addClass("row").append(codeCol1).append(codeCol2).append(delBtnCol).append(addBtnCol);
	var filterArea = $("<div>").addClass("col-md-12").addClass("gb-optiondefinition-filterarea");
	var filterAreaRow = $("<div>").addClass("row").append(filterArea);
	var totalArea = $("<div>").addClass("well").append(addFilterRow).append(filterAreaRow);
	$(btn).parents().eq(2).find(".gb-optiondefinition-tuplearea").append(totalArea);
	$(".gb-optiondefinition-select-filtercode").trigger("change");
};
/**
 * 피규어 조건에 레이어 선택 폼을 추가한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#addLayerCodeFigure
 * @param {HTMLElement}
 *            btn - 조건 추가 버튼 객체
 */
gb.validation.OptionDefinition.prototype.addLayerCodeFigure = function(btn) {
	var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.code[this.locale] + ":");
	var codeSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-figurecode");
	var cat = this.getLayerDefinition().getStructure();

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var category;
	if (sec) {
		category = this.nowRelationCategory;
	} else {
		category = this.nowCategory;
	}

	if (category === null) {
		var tup = $(btn).parents().eq(2).find(".gb-optiondefinition-tuplearea");
		var well = $(tup).find(".well");
		var isExist = false;
		for (var i = 0; i < well.length; i++) {
			var selec = $(well[i]).find(".gb-optiondefinition-select-figurecode");
			if ($(selec).children('option').filter("option:selected").attr("geom") === "none") {
				isExist = true;
				break;
			}
		}
		if (isExist) {
			this.setMessagePopup("danger", this.translation.nomoreadd[this.locale]);
			return;
		}
		var allCode = $("<option>").text(this.translation.applyAll[this.locale]).attr("geom", "none");
		$(codeSelect).append(allCode);
	} else if(category !== undefined) {
		var tup = $(btn).parents().eq(2).find(".gb-optiondefinition-tuplearea");
		var well = $(tup).find(".well");
		var isExist = false;
		for (var i = 0; i < well.length; i++) {
			var selec = $(well[i]).find(".gb-optiondefinition-select-figurecode");
			if ($(selec).children('option').filter("option:selected").attr("geom") === "none") {
				isExist = true;
				break;
			}
		}
		if (isExist) {
			this.setMessagePopup("danger", this.translation.nomoreadd[this.locale]);
			return;
		}
		if (Array.isArray(cat)) {
			for (var i = 0; i < cat.length; i++) {
				if (cat[i].name === category) {
					// 현재 분류의 레이어 코드
					var layers = cat[i].layers;
					// 레이어 코드 필터 영역
					var tup = $(btn).parents().eq(2).find(".gb-optiondefinition-tuplearea");
					// 추가한 코드들
					var well = $(tup).find(".well");
					// 모든 코드 개수랑 추가한 코드 개수가 같으면
					if (layers.length === well.length) {
						// 추가안함
						this.setMessagePopup("danger", this.translation.nomoreadd[this.locale]);
						return;
					}
					var allCode = $("<option>").text(this.translation.applyAll[this.locale]).attr("geom", "none");
					$(codeSelect).append(allCode);
					for (var j = 0; j < layers.length; j++) {
						var option = $("<option>").text(layers[j].code).attr("geom", layers[j].geometry);
						$(codeSelect).append(option);
						// 중복 확인
						var isExist = false;
						for (var k = 0; k < well.length; k++) {
							var selec = $(well[k]).find(".gb-optiondefinition-select-figurecode");
							if ($(selec).children('option').filter("option:selected").attr("geom") !== "none" && $(selec).children('option').filter("option:selected").text() === layers[j].code) {
								isExist = true;
								break;
							}
						}
						if (!isExist) {
							$(option).prop("selected", true);
						}
						// 중복 확인
					}
				}
			}
		}
	}

	var codeCol2 = $("<div>").addClass("col-md-7").append(codeSelect);

	var delBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-deletelayerfigure").text(
			this.translation.deleteLayerCode[this.locale]).addClass("gb-optiondefinition-btn-with100");
	var delBtnCol = $("<div>").addClass("col-md-2").append(delBtn)

	var addBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-addfigure").text(
			this.translation.addAttr[this.locale]).addClass("gb-optiondefinition-btn-with100");
	var addBtnCol = $("<div>").addClass("col-md-2").append(addBtn);

	var addFigureRow = $("<div>").addClass("row").append(codeCol1).append(codeCol2).append(delBtnCol).append(addBtnCol);
	var figureArea = $("<div>").addClass("col-md-12").addClass("gb-optiondefinition-figurearea");
	var figureAreaRow = $("<div>").addClass("row").append(figureArea);
	var totalArea = $("<div>").addClass("well").append(addFigureRow).append(figureAreaRow);
	$(btn).parents().eq(2).find(".gb-optiondefinition-tuplearea").append(totalArea);
	$(".gb-optiondefinition-select-figurecode").trigger("change");
};
/**
 * 톨러런스 조건에 레이어 선택폼 을 추가한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#addLayerCodeTolerance
 * @param {HTMLElement}
 *            btn - 입력폼 추가 버튼 객체
 */
gb.validation.OptionDefinition.prototype.addLayerCodeTolerance = function(btn) {
	var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.code[this.locale] + ":");
	var codeSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-tolerancecode");
	var cat = this.getLayerDefinition().getStructure();

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}

	var category;
	if (sec) {
		category = this.nowRelationCategory;
	} else {
		category = this.nowCategory;
	}

	if (category === null) {
		var tup = $(btn).parents().eq(2).find(".gb-optiondefinition-tuplearea");
		var well = $(tup).find(".well");
		var isExist = false;
		for (var i = 0; i < well.length; i++) {
			var selec = $(well[i]).find(".gb-optiondefinition-select-tolerancecode");
			if ($(selec).children('option').filter("option:selected").attr("geom") === "none") {
				isExist = true;
				break;
			}
		}
		if (isExist) {
			this.setMessagePopup("danger", this.translation.nomoreadd[this.locale]);
			return;
		}
		var allCode = $("<option>").text(this.translation.applyAll[this.locale]).attr("geom", "none");
		$(codeSelect).append(allCode);
	} else if(category !== undefined) {
		var tup = $(btn).parents().eq(2).find(".gb-optiondefinition-tuplearea");
		var well = $(tup).find(".well");
		var isExist = false;
		for (var i = 0; i < well.length; i++) {
			var selec = $(well[i]).find(".gb-optiondefinition-select-tolerancecode");
			if ($(selec).children('option').filter("option:selected").attr("geom") === "none") {
				isExist = true;
				break;
			}
		}
		if (isExist) {
			this.setMessagePopup("danger", this.translation.nomoreadd[this.locale]);
			return;
		}
		if (Array.isArray(cat)) {
			for (var i = 0; i < cat.length; i++) {
				if (cat[i].name === category) {
					// 현재 분류의 레이어 코드
					var layers = cat[i].layers;
					// 레이어 코드 필터 영역
					var tup = $(btn).parents().eq(2).find(".gb-optiondefinition-tuplearea");
					// 추가한 코드들
					var well = $(tup).find(".well");
					// 모든 코드 개수랑 추가한 코드 개수가 같으면
					if (layers.length === well.length) {
						// 추가안함
						this.setMessagePopup("danger", this.translation.nomoreadd[this.locale]);
						return;
					}
					var allCode = $("<option>").text(this.translation.applyAll[this.locale]).attr("geom", "none");
					$(codeSelect).append(allCode);
					for (var j = 0; j < layers.length; j++) {
						var option = $("<option>").text(layers[j].code).attr("geom", layers[j].geometry);
						$(codeSelect).append(option);
						// 중복 확인
						var isExist = false;
						for (var k = 0; k < well.length; k++) {
							var selec = $(well[k]).find(".gb-optiondefinition-select-tolerancecode");
							if ($(selec).children('option').filter("option:selected").attr("geom") !== "none" && $(selec).children('option').filter("option:selected").text() === layers[j].code) {
								isExist = true;
								break;
							}
						}
						if (!isExist) {
							$(option).prop("selected", true);
						}
						// 중복 확인
					}
				}
			}
		}
	}

	var codeCol2 = $("<div>").addClass("col-md-9").append(codeSelect);

	var delBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-deletelayertolerance").text(
			this.translation.deleteLayerCode[this.locale]).addClass("gb-optiondefinition-btn-with100");
	var delBtnCol = $("<div>").addClass("col-md-2").append(delBtn);

	/*
	 * var addBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-addtolerance").text("조건
	 * 추가").css( "width", "100%"); var addBtnCol = $("<div>").addClass("col-md-2").append(addBtn);
	 */

	var addFigureRow = $("<div>").addClass("row").append(codeCol1).append(codeCol2).append(delBtnCol);
	var figureArea = $("<div>").addClass("col-md-12").addClass("gb-optiondefinition-tolerancearea");
	// ============================
	var optItem = this.optItem[this.nowOption.alias];
	var row = $("<div>").addClass("row");

	if (sec) {

		var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.figure[this.locale] + ":");
		var inputNum = $("<input>").attr({
			"type" : "number",
			"placeholder" : this.translation.figureInterEx[this.locale]
		}).addClass("form-control").addClass("gb-optiondefinition-input-tolerancevalue");
		if (!optItem.relation.tolerance.value) {
			$(inputNum).prop("disabled", true);
		}
		var numCol2 = $("<div>").addClass("col-md-3").append(inputNum);
		$(row).append(numCol1).append(numCol2);

		var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.condition[this.locale] + ":");
		var codeSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-tolerancecondition");
		var optionNone = $("<option>").text(this.translation.noselect[this.locale]).attr("value", "null");
		var optionEqual = $("<option>").text(this.translation.equal[this.locale]).attr("value", "equal");
		var optionOver = $("<option>").text(this.translation.excess[this.locale]).attr("value", "over");
		var optionUnder = $("<option>").text(this.translation.under[this.locale]).attr("value", "under");
		var optionAndOver = $("<option>").text(this.translation.andOver[this.locale]).attr("value", "andover");
		var optionAndUnder = $("<option>").text(this.translation.andUnder[this.locale]).attr("value", "andunder");
		$(codeSelect).append(optionNone).append(optionEqual).append(optionOver).append(optionUnder).append(optionAndOver).append(optionAndUnder);
		if (!optItem.relation.tolerance.condition) {
			$(codeSelect).prop("disabled", true);
		}
		var codeCol2 = $("<div>").addClass("col-md-3").append(codeSelect);
		$(row).append(codeCol1).append(codeCol2);

		var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.interval[this.locale] + ":");
		var inputNum = $("<input>").attr({
			"type" : "number",
			"placeholder" : this.translation.figureInterEx[this.locale]
		}).addClass("form-control").addClass("gb-optiondefinition-input-toleranceinterval");
		if (!optItem.relation.tolerance.interval) {
			$(inputNum).prop("disabled", true);
		}
		var numCol2 = $("<div>").addClass("col-md-3").append(inputNum);

		$(row).append(numCol1).append(numCol2);

		$(figureArea).append(row);
	} else {

		var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.figure[this.locale] + ":");
		var inputNum = $("<input>").attr({
			"type" : "number",
			"placeholder" : this.translation.figureInterEx[this.locale]
		}).addClass("form-control").addClass("gb-optiondefinition-input-tolerancevalue");
		if (!optItem.tolerance.value) {
			$(inputNum).prop("disabled", true);
		}
		var numCol2 = $("<div>").addClass("col-md-3").append(inputNum);

		$(row).append(numCol1).append(numCol2);

		var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.condition[this.locale] + ":");
		var codeSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-tolerancecondition");
		var optionNone = $("<option>").text(this.translation.noselect[this.locale]).attr("value", "null");
		var optionEqual = $("<option>").text(this.translation.equal[this.locale]).attr("value", "equal");
		var optionOver = $("<option>").text(this.translation.excess[this.locale]).attr("value", "over");
		var optionUnder = $("<option>").text(this.translation.under[this.locale]).attr("value", "under");
		var optionAndOver = $("<option>").text(this.translation.andOver[this.locale]).attr("value", "andover");
		var optionAndUnder = $("<option>").text(this.translation.andUnder[this.locale]).attr("value", "andunder");
		$(codeSelect).append(optionNone).append(optionEqual).append(optionOver).append(optionUnder).append(optionAndOver).append(optionAndUnder);
		if (!optItem.tolerance.condition) {
			$(codeSelect).prop("disabled", true);
		}
		var codeCol2 = $("<div>").addClass("col-md-3").append(codeSelect);
		$(row).append(codeCol1).append(codeCol2);

		var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.interval[this.locale] + ":");
		var inputNum = $("<input>").attr({
			"type" : "number",
			"placeholder" : this.translation.figureInterEx[this.locale]
		}).addClass("form-control").addClass("gb-optiondefinition-input-toleranceinterval");
		if (!optItem.tolerance.interval) {
			$(inputNum).prop("disabled", true);
		}
		var numCol2 = $("<div>").addClass("col-md-3").append(inputNum);

		$(row).append(numCol1).append(numCol2);

		$(figureArea).append(row);
	}

	/*
	 * var btnDel = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-delete-row").text("조건
	 * 삭제").css( "width", "100%"); var delCol1 = $("<div>").addClass("col-md-2").append(btnDel);
	 * $(row).append(delCol1);
	 */

	// ============================
	var figureAreaRow = $("<div>").addClass("row").append(figureArea);
	var totalArea = $("<div>").addClass("well").append(addFigureRow).append(figureAreaRow);
	$(btn).parents().eq(2).find(".gb-optiondefinition-tuplearea").append(totalArea);
// $(".gb-optiondefinition-select-tolerancecode").trigger("change");
};
/**
 * 필터를 적용할 레이어를 선택한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#selectFilterCode
 * @param {HTMLElement}
 *            sel - 레이어 선택 폼 객체
 */
gb.validation.OptionDefinition.prototype.selectFilterCode = function(sel) {

	var nowOption = this.optItem[this.nowOption.alias];
	if (nowOption === undefined) {
		return;
	}

	var sec = false;
	if (this.nowDetailCategory !== undefined) {
		if (this.nowDetailCategory.alias === "relation" && this.nowRelationCategory !== undefined) {
			sec = true;
		}
	}
	// 레이어 인덱스
	var layerIdx = $(sel).parents().eq(2).index();
	// 코드 중복 상태
	var duplicatedOpt = {};
	// 레이어 코드 필터 영역
	var tup = $(sel).parents().eq(3);
	// 선택된 모든 레이어 코드 셀렉트 옵션
	var selectedCode = $(tup).find(".gb-optiondefinition-select-filtercode");
	var firstSelect = selectedCode[0];
	if (firstSelect !== undefined) {
		var allCode = $(firstSelect).find("option");
		for (var i = 0; i < allCode.length; i++) {
			duplicatedOpt[$(allCode[i]).text()] = false;
		}
	}

	// 추가한 코드들
	var well = $(tup).find(".well");
	// 지금 선택한게 중복인지
	var isExist = false;
	// 모든 웰을 돌면서
	for (var i = 0; i < well.length; i++) {
		// 현재 셀렉트 박스는 재끼고
		if (i === layerIdx) {
			continue;
		}
		var selec = $(well[i]).find(".gb-optiondefinition-select-filtercode");
		duplicatedOpt[$(selec).val()] = true;
	}

	if ((duplicatedOpt[$(sel).val()]) || (well.length > 1 && $(sel).find("option:selected").attr("geom") === "none")) {
		var codeKeys = Object.keys(duplicatedOpt);
		for (var i = 0; i < codeKeys.length; i++) {
			if (!duplicatedOpt[codeKeys[i]]) {
				this.setMessagePopup("danger", this.translation.nomoreadd[this.locale]);
				$(sel).val(codeKeys[i]);
				$(sel).trigger("change");
				return;
			}
		}
	}

	// 레이어 코드
	var layerCode = null;
	if (!$(sel).prop("disabled")) {
		layerCode = $(sel).find("option:selected").attr("geom") === "none" ? null : $(sel).val();
	}
	// 검수 항목 정보
	var optItem = this.optItem[this.nowOption.alias];
	// 검수 타입
	var type3 = optItem["purpose"];
	// 현재 코드에 설정된 필터 갯수
	var filters = $(sel).parents().eq(2).find(".gb-optiondefinition-filterarea").children();
	// 현재 레이어코드에 필터가 있는지?
	if (filters.length > 0) {
		var strc = this.getStructure();
		if (Array.isArray(strc["definition"])) {
			var isExist = false;
			for (var i = 0; i < strc["definition"].length; i++) {
				// 현재 검수 옵션에 현재 분류가 있는지?
				if (this.nowCategory === strc["definition"][i].name) {
					isExist = true;
					// 검수 옵션에 현재 타입 키가 있는지 애트리뷰트, 그래픽..
					if (strc["definition"][i]["options"].hasOwnProperty(type3)) {
						// 현재 검수 항목이 들어있는지?
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								continue;
							}
							console.log("현재 레이어 코드:" + $(sel).val());
							// 릴레이션 레이어 필터일때
							if (sec) {
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
									var relation = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
									if (Array.isArray(relation)) {
										for (var j = 0; j < relation.length; j++) {
											if (relation[j].name === this.nowRelationCategory) {
												// 필터키를 가지고 있는지?
												if (relation[j].hasOwnProperty("filter")) {
													if (Array.isArray(relation[j]["filter"])) {
														for (var k = 0; k < relation[j]["filter"].length; k++) {
															// 코드 키를 가지고 있는지?
															if (relation[j]["filter"][k].hasOwnProperty("code")) {
																relation[j]["filter"][k]["code"] = layerCode;
															} else {
																// 코드 키를 가지고 있지
																// 않다면
															}
														}
													}
												} else {
													// 필터키를 가지고 있지 않다면
												}
											}
										}
									}
								}
							} else {
								// 그냥 레이어 필터일때
								// 필터 키가 들어있는지
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("filter")) {
									var filters = strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"];
									if (Array.isArray(filters)) {
										if (filters[layerIdx].hasOwnProperty("code")) {
											strc["definition"][i]["options"][type3][this.nowOption.alias]["filter"][layerIdx]["code"] = layerCode;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
/**
 * 검수 분류를 설정한다.
 * 
 * @method gb.validation.OptionDefinition#setQACategory
 * @param {string}
 *            qa - 검수 분류 식별자
 */
gb.validation.OptionDefinition.prototype.setQACategory = function(qa) {
	this.qaCat = qa;
	console.log(this.getQACategory());
};
/**
 * 검수 분류를 반환한다.
 * 
 * @method gb.validation.OptionDefinition#getQACategory
 * @return {string} 검수 분류 식별자
 */
gb.validation.OptionDefinition.prototype.getQACategory = function() {
	return this.qaCat;
};
/**
 * 검수 버전을 설정한다.
 * 
 * @method gb.validation.OptionDefinition#setQAVersion
 * @param {string}
 *            qa - 검수 버전 식별자
 */
gb.validation.OptionDefinition.prototype.setQAVersion = function(qa) {
	this.qaVer = qa;
	console.log(this.getQAVersion());
};
/**
 * 검수 버전을 반환한다.
 * 
 * @method gb.validation.OptionDefinition#getQAVersion
 * @return {string} 검수 버전 식별자
 */
gb.validation.OptionDefinition.prototype.getQAVersion = function() {
	return this.qaVer;
};
/**
 * 필터 조건을 추가한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#addFilterRow
 * @param {HTMLElement}
 *            btn - 조건 추가 버튼 객체
 */
gb.validation.OptionDefinition.prototype.addFilterRow = function(btn) {
	if (this.nowOption === undefined) {
		return;
	}
	var optItem = this.optItem[this.nowOption.alias];
	var row = $("<div>").addClass("row");
	if (optItem.filter.key) {
		var attrCol1 = $("<div>").addClass("col-md-1").text(this.translation.attrName[this.locale] + ":");
		var inputAttr = $("<input>").attr({
			"type" : "text",
			"placeholder" : this.translation.attrNameEx[this.locale]
		}).addClass("form-control").addClass("gb-optiondefinition-input-filterkey");
		var attrCol2 = $("<div>").addClass("col-md-2").append(inputAttr);

		$(row).append(attrCol1).append(attrCol2);
	}
	if (optItem.filter.values) {
		var filterCol1 = $("<div>").addClass("col-md-1").text(this.translation.acceptVal[this.locale] + ":");
		var inputValues = $("<input>").attr({
			"type" : "text",
			"placeholder" : this.translation.acceptValEx[this.locale]
		}).addClass("form-control").addClass("gb-optiondefinition-input-filtervalues");
		var filterCol2 = $("<div>").addClass("col-md-6").append(inputValues);
		$(row).append(filterCol1).append(filterCol2);
	}
	var btnDel = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-deletefilterrow").text(
			this.translation.deleteFilter[this.locale]).addClass("gb-optiondefinition-btn-with100");
	var delCol1 = $("<div>").addClass("col-md-2").append(btnDel);
	$(row).append(delCol1);

	$(btn).parents().eq(2).find(".gb-optiondefinition-filterarea").append(row);

};

/**
 * 필터 조건을 추가한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#addFilterRowForNone
 * @param {HTMLElement}
 *            btn - 조건 추가 버튼 객체
 */
gb.validation.OptionDefinition.prototype.addFilterRowForNone = function(btn) {
	if (this.nowOption === undefined) {
		return;
	}
	var optItem = this.optItem[this.nowOption.alias];
	var row = $("<div>").addClass("row");
	if (optItem.filter.key) {
		var attrCol1 = $("<div>").addClass("col-md-1").text(this.translation.attrName[this.locale] + ":");
		var inputAttr = $("<input>").attr({
			"type" : "text",
			"placeholder" : this.translation.attrNameEx[this.locale]
		}).addClass("form-control").addClass("gb-optiondefinition-input-filterkey-fornone");
		var attrCol2 = $("<div>").addClass("col-md-2").append(inputAttr);

		$(row).append(attrCol1).append(attrCol2);
	}
	if (optItem.filter.values) {
		var filterCol1 = $("<div>").addClass("col-md-1").text(this.translation.acceptVal[this.locale] + ":");
		var inputValues = $("<input>").attr({
			"type" : "text",
			"placeholder" : this.translation.acceptValEx[this.locale]
		}).addClass("form-control").addClass("gb-optiondefinition-input-filtervalues-fornone");
		var filterCol2 = $("<div>").addClass("col-md-6").append(inputValues);
		$(row).append(filterCol1).append(filterCol2);
	}
	var btnDel = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-deletefilterrow").text(
			this.translation.deleteFilter[this.locale]).addClass("gb-optiondefinition-btn-with100");
	var delCol1 = $("<div>").addClass("col-md-2").append(btnDel);
	$(row).append(delCol1);

	var tup = $(btn).parents().eq(2).find(".gb-optiondefinition-tuplearea")[0];
	if (tup === undefined) {
		tup = $("<div>").addClass("gb-optiondefinition-tuplearea");
		$(btn).parents().eq(2).append(tup);
	}

	var filterArea = $(tup).find(".gb-optiondefinition-filterarea")[0];
	if (filterArea === undefined) {
		filterArea = $("<div>").addClass("col-md-12").addClass("gb-optiondefinition-filterarea");
		var outerRow = $("<div>").addClass("row").append(filterArea);
		var outerWell = $("<div>").addClass("well").append(outerRow);
		$(tup).append(outerWell);
	}
	$(filterArea).append(row);

};
/**
 * 피규어 조건 입력폼을 추가한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#refreshFigureToFilterSelect
 * @param {HTMLElement}
 *            sel - 레이어 코드 셀렉트박스
 */
gb.validation.OptionDefinition.prototype.refreshFigureToFilterSelect = function(sel) {
	var well = $(sel).parents().eq(2);
	var filterSelect = $(well).find(".gb-optiondefinition-select-figuretofilter");
	$(filterSelect).empty();
	var noSelectOpt = $("<option>").attr("value", "null").text(this.translation.noselect[this.locale]);
	$(filterSelect).append(noSelectOpt);
	var optItem = this.optItem[this.nowOption.alias];
	if (!optItem.figure.filter) {
		$(filterSelect).prop("disabled", true);
	} else {
		// 필터에서 같은 코드를 찾아서 그 애트리뷰트들의 목록을 보여주기
		console.log(this.nowCategory);
		console.log(this.nowOption);
		console.log(this.nowDetailCategory);
		console.log(this.nowRelationCategory);
		console.log(this.nowRelationDetailCategory);
		console.log(this.getStructure());
		var definition = this.getStructure()["definition"];
		for (var i = 0; i < definition.length; i++) {
			var name = definition[i]["name"];
			if (name === this.nowCategory) {
				if (definition[i].hasOwnProperty("options")) {
					var type3 = optItem["purpose"];
					if (definition[i]["options"].hasOwnProperty(type3)) {
						if (definition[i]["options"][type3].hasOwnProperty(this.nowOption["alias"])) {
							if (definition[i]["options"][type3][this.nowOption["alias"]].hasOwnProperty("filter")) {
								var nowCode = $(sel).val();
								var filters = definition[i]["options"][type3][this.nowOption["alias"]]["filter"];
								if (!filters) {
									continue;
								}
								for (var j = 0; j < filters.length; j++) {
									if(filters[j]["code"] === nowCode) {
										if (filters[j].hasOwnProperty("attribute") && Array.isArray(filters[j]["attribute"])) {
											var attributes = filters[j]["attribute"];
											for (var k = 0; k < attributes.length; k++) {
												var attrLabel = this.translation.attrName[this.locale];
												var attrName = attributes[k]["key"];
												var valuesLabel = this.translation.acceptVal[this.locale];
												var values = attributes[k]["values"];
												var opt = $("<option>").attr("value", k).text(attrLabel+": "+attrName+" / "+valuesLabel+": "+values);
												$(filterSelect).append(opt);
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
/**
 * 피규어 조건 입력폼을 추가한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#addFigureRow
 * @param {HTMLElement}
 *            btn - 입력폼 추가 버튼 객체
 */
gb.validation.OptionDefinition.prototype.addFigureRow = function(btn) {
	if (this.nowOption === undefined) {
		return;
	}
	var optItem = this.optItem[this.nowOption.alias];

	var connFilterRow = $("<div>").addClass("row");

	var connFilterCol1 = $("<div>").addClass("col-md-2").text(this.translation.connFilter[this.locale] + ":");

	var filterSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-figuretofilter");
	var noSelectOpt = $("<option>").attr("value", "null").text(this.translation.noselect[this.locale]);
	$(filterSelect).append(noSelectOpt);
	if (!optItem.figure.filter) {
		$(filterSelect).prop("disabled", true);
	} else {
		// 필터에서 같은 코드를 찾아서 그 애트리뷰트들의 목록을 보여주기
		console.log(this.nowCategory);
		console.log(this.nowOption);
		console.log(this.nowDetailCategory);
		console.log(this.nowRelationCategory);
		console.log(this.nowRelationDetailCategory);
		console.log(this.getStructure());
		var definition = this.getStructure()["definition"];
		for (var i = 0; i < definition.length; i++) {
			var name = definition[i]["name"];
			if (name === this.nowCategory) {
				if (definition[i].hasOwnProperty("options")) {
					var type3 = optItem["purpose"];
					if (definition[i]["options"].hasOwnProperty(type3)) {
						if (definition[i]["options"][type3].hasOwnProperty(this.nowOption["alias"])) {
							if (definition[i]["options"][type3][this.nowOption["alias"]].hasOwnProperty("filter")) {
								var nowCode = $(btn).parents().eq(1).find(".gb-optiondefinition-select-figurecode").val();
								var filters = definition[i]["options"][type3][this.nowOption["alias"]]["filter"];
								if (!filters) {
									continue;
								}
								for (var j = 0; j < filters.length; j++) {
									if(filters[j]["code"] === nowCode) {
										if (filters[j].hasOwnProperty("attribute") && Array.isArray(filters[j]["attribute"])) {
											var attributes = filters[j]["attribute"];
											for (var k = 0; k < attributes.length; k++) {
												var attrLabel = this.translation.attrName[this.locale];
												var attrName = attributes[k]["key"];
												var valuesLabel = this.translation.acceptVal[this.locale];
												var values = attributes[k]["values"];
												var opt = $("<option>").attr("value", k).text(attrLabel+": "+attrName+" / "+valuesLabel+": "+values);
												$(filterSelect).append(opt);
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	var connFilterCol2 = $("<div>").addClass("col-md-10").append(filterSelect);

	$(connFilterRow).append(connFilterCol1).append(connFilterCol2);

	var row = $("<div>").addClass("row");

	var attrCol1 = $("<div>").addClass("col-md-1").text(this.translation.attrName[this.locale] + ":");
	var inputAttr = $("<input>").attr({
		"type" : "text",
		"placeholder" : this.translation.attrNameEx[this.locale]
	}).addClass("form-control").addClass("gb-optiondefinition-input-figurekey");
	if (!optItem.figure.key) {
		$(inputAttr).prop("disabled", true);
	}
	var attrCol2 = $("<div>").addClass("col-md-2").append(inputAttr);

	$(row).append(attrCol1).append(attrCol2);

	var filterCol1 = $("<div>").addClass("col-md-1").text(this.translation.acceptVal[this.locale] + ":");
	var inputValues = $("<input>").attr({
		"type" : "text",
		"placeholder" : this.translation.acceptValEx[this.locale]
	}).addClass("form-control").addClass("gb-optiondefinition-input-figurevalues");
	if (!optItem.figure.values) {
		$(inputValues).prop("disabled", true);
	}
	var filterCol2 = $("<div>").addClass("col-md-8").append(inputValues);
	$(row).append(filterCol1).append(filterCol2);

	var row2 = $("<div>").addClass("row");

	var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.figure[this.locale] + ":");
	var inputNum = $("<input>").attr({
		"type" : "number",
		"placeholder" : this.translation.figureInterEx[this.locale]
	}).addClass("form-control").addClass("gb-optiondefinition-input-figurenumber");
	if (!optItem.figure.number) {
		$(inputNum).prop("disabled", true);
	}
	var numCol2 = $("<div>").addClass("col-md-3").append(inputNum);

	$(row2).append(numCol1).append(numCol2);

	var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.condition[this.locale] + ":");
	var codeSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-figurecondition");
	var optionNone = $("<option>").text(this.translation.noselect[this.locale]).attr("value", "null");
	var optionEqual = $("<option>").text(this.translation.equal[this.locale]).attr("value", "equal");
	var optionOver = $("<option>").text(this.translation.excess[this.locale]).attr("value", "over");
	var optionUnder = $("<option>").text(this.translation.under[this.locale]).attr("value", "under");
	var optionAndOver = $("<option>").text(this.translation.andOver[this.locale]).attr("value", "andover");
	var optionAndUnder = $("<option>").text(this.translation.andUnder[this.locale]).attr("value", "andunder");
	$(codeSelect).append(optionNone).append(optionEqual).append(optionOver).append(optionUnder).append(optionAndOver).append(optionAndUnder);
	if (!optItem.figure.condition) {
		$(codeSelect).prop("disabled", true);
	}
	var codeCol2 = $("<div>").addClass("col-md-2").append(codeSelect);
	$(row2).append(codeCol1).append(codeCol2);

	var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.interval[this.locale] + ":");
	var inputNum = $("<input>").attr({
		"type" : "number",
		"placeholder" : this.translation.figureInterEx[this.locale]
	}).addClass("form-control").addClass("gb-optiondefinition-input-figureinterval");
	if (!optItem.figure.interval) {
		$(inputNum).prop("disabled", true);
	}
	var numCol2 = $("<div>").addClass("col-md-2").append(inputNum);

	$(row2).append(numCol1).append(numCol2);

	var btnDel = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-deletefigurerow").text(
			this.translation.deleteAttr[this.locale]).addClass("gb-optiondefinition-btn-with100");
	var delCol1 = $("<div>").addClass("col-md-2").append(btnDel);
	$(row2).append(delCol1);

	var outerRow = $("<div>").addClass("gb-optiondefinition-figurearea-row").append(connFilterRow).append(row).append(row2);
	$(btn).parents().eq(2).find(".gb-optiondefinition-figurearea").append(outerRow);
};
/**
 * 톨러런스 조건 입력폼을 추가한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#addToleranceRow
 * @param {HTMLElement}
 *            btn - 입력폼 추가 버튼 객체
 */
gb.validation.OptionDefinition.prototype.addToleranceRow = function(btn) {
	if (this.nowOption === undefined) {
		return;
	}
	var optItem = this.optItem[this.nowOption.alias];
	var row = $("<div>").addClass("row");

	var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.figure[this.locale] + ":");
	var inputNum = $("<input>").attr({
		"type" : "number",
		"placeholder" : this.translation.figureInterEx[this.locale]
	}).addClass("form-control").addClass("gb-optiondefinition-input-tolerancevalue");
	if (!optItem.tolerance.value) {
		$(inputNum).prop("disabled", true);
	}
	var numCol2 = $("<div>").addClass("col-md-3").append(inputNum);

	$(row).append(numCol1).append(numCol2);

	var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.condition[this.locale] + ":");
	var codeSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-tolerancecondition");
	var optionNone = $("<option>").text(this.translation.noselect[this.locale]).attr("value", "null");
	var optionEqual = $("<option>").text(this.translation.equal[this.locale]).attr("value", "equal");
	var optionOver = $("<option>").text(this.translation.excess[this.locale]).attr("value", "over");
	var optionUnder = $("<option>").text(this.translation.under[this.locale]).attr("value", "under");
	var optionAndOver = $("<option>").text(this.translation.andOver[this.locale]).attr("value", "andover");
	var optionAndUnder = $("<option>").text(this.translation.andUnder[this.locale]).attr("value", "andunder");
	$(codeSelect).append(optionNone).append(optionEqual).append(optionOver).append(optionUnder).append(optionAndOver).append(optionAndUnder);
	if (!optItem.tolerance.condition) {
		$(codeSelect).prop("disabled", true);
	}
	var codeCol2 = $("<div>").addClass("col-md-2").append(codeSelect);
	$(row).append(codeCol1).append(codeCol2);

	var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.interval[this.locale] + ":");
	var inputNum = $("<input>").attr({
		"type" : "number",
		"placeholder" : this.translation.figureInterEx[this.locale]
	}).addClass("form-control").addClass("gb-optiondefinition-input-toleranceinterval");
	if (!optItem.tolerance.interval) {
		$(inputNum).prop("disabled", true);
	}
	var numCol2 = $("<div>").addClass("col-md-2").append(inputNum);

	$(row).append(numCol1).append(numCol2);

	var btnDel = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-deletetolerancerow").text("조건 삭제")
	.addClass("gb-optiondefinition-btn-with100");
	var delCol1 = $("<div>").addClass("col-md-2").append(btnDel);
	$(row).append(delCol1);

	$(btn).parents().eq(2).find(".gb-optiondefinition-tolerancearea").append(row);
};
/**
 * 도곽선 레이어를 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#setBorderLayer
 * @param {HTMLElement}
 *            sel - 도곽선 레이어 선택 폼 객체
 */
gb.validation.OptionDefinition.prototype.setBorderLayer = function(sel) {
	var opt = $(sel).find("option:selected");
	var strc = this.getStructure();
	if ($(opt).attr("geom") !== "none") {
		strc["border"] = {
				"code" : $(opt).text(),
				"geometry" : $(opt).attr("geom")
		};
	} else if ($(opt).attr("geom") === "none") {
		strc["border"] = null
	}
	console.log(this.getStructure());
};
/**
 * 네비게이션바를 업데이트 한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#updateNavigation
 * @param {number}
 *            idx - 현재 설정 단계
 * @param {boolean}
 *            rel - 릴레이션 레이어 설정 필요 여부
 * @param {boolean}
 *            all - 모든 분류 선택 여부
 */
gb.validation.OptionDefinition.prototype.updateNavigation = function(idx, rel) {
	// 인덱스와 레이블을 받아서 해당 인덱스에 레이블 텍스트와 애트리뷰트에 밸류를 넣고 이후의 엘리먼트를 삭제한다.
	// 제일 마지막 엘리먼트에 링크를 지운다
	$(this.navi).empty();
	for (var i = 0; i < (idx + 1); i++) {
		if (i === 0) {
			if (i === idx) {
				var li = $("<li>").addClass("active").text(this.translation.selectCat[this.locale]);
				$(this.navi).append(li);
			} else {
				var btn = $("<button>").addClass("btn").addClass("btn-link").addClass("gb-optiondefinition-navi-category");
				if (this.nowCategory !== undefined) {
					$(btn).text(this.nowCategory);
				} else {
					$(btn).text(this.translation.selectCat[this.locale]);
				}
				var li = $("<li>").append(btn);
				$(this.navi).append(li);
			}
		} else if (i === 1) {
			if (i === idx) {
				var li = $("<li>").addClass("active").text(this.translation.valItemSetting[this.locale]);
				$(this.navi).append(li);
			} else {
				var btn = $("<button>").addClass("btn").addClass("btn-link").addClass("gb-optiondefinition-navi-option");
				if (this.nowOption !== undefined) {
					$(btn).text(this.nowOption.title);
					$(btn).attr("value", this.nowOption.alias);
				} else {
					$(btn).text(this.translation.valItemSetting[this.locale]);
				}
				var li = $("<li>").append(btn);
				$(this.navi).append(li);
			}
		} else if (i === 2) {
			if (i === idx) {
				var li = $("<li>").addClass("active").text(this.translation.detailValidationSetting[this.locale]);
				$(this.navi).append(li);
			} else {
				var btn = $("<button>").addClass("btn").addClass("btn-link").addClass("gb-optiondefinition-navi-detailcategory");
				if (this.nowDetailCategory !== undefined) {
					$(btn).text(this.nowDetailCategory.title);
				} else {
					$(btn).text(this.translation.detailValidationSetting[this.locale]);
				}
				var li = $("<li>").append(btn);
				$(this.navi).append(li);
			}
		} else if (i === 3) {
			if (i === idx) {
				if (rel) {
					var li = $("<li>").addClass("active").text(this.translation.selectRelationLayer[this.locale]);
					$(this.navi).append(li);
				} else {
					var li = $("<li>").addClass("active").text(this.translation.enterDetailSetting[this.locale]);
					$(this.navi).append(li);
				}
			} else {
				var btn = $("<button>").addClass("btn").addClass("btn-link").addClass("gb-optiondefinition-navi-relationcategory");

				if (this.nowRelationCategory == null) {
					$(btn).text(this.translation.allCat[this.locale]);
				}  else if (this.nowRelationCategory !== undefined) {
					$(btn).text(this.nowRelationCategory);
				} else {
					$(btn).text(this.translation.selectRelationLayerDetail[this.locale]);
				}	

				var li = $("<li>").append(btn);
				$(this.navi).append(li);
			}
		} else if (i === 4) {
			if (i === idx) {
				var li = $("<li>").addClass("active").text(this.translation.selectRelationLayerDetail[this.locale]);
				$(this.navi).append(li);
			} else {
				var btn = $("<button>").addClass("btn").addClass("btn-link");
				if (this.nowRelationCategory == null) {
					$(btn).addClass("gb-optiondefinition-navi-relationdetailcategory-all");
				} else {
					$(btn).addClass("gb-optiondefinition-navi-relationdetailcategory");
				}
				if (this.nowRelationDetailCategory !== undefined) {
					$(btn).text(this.nowRelationDetailCategory.title);
				} else {
					$(btn).text(this.translation.selectRelationLayerDetail[this.locale]);
				}
// else if(this.nowRelationDetailCategory !== null){
// $(btn).text(this.translation.allCat[this.locale]);
// }
				var li = $("<li>").append(btn);
				$(this.navi).append(li);
			}
		} else if (i === 5) {
			if (i === idx) {
				var li = $("<li>").addClass("active").text(this.translation.enterRelationLayerDetail[this.locale]);
				$(this.navi).append(li);
			}
		}
	}
	console.log(this.nowCategory);
	console.log(this.nowOption);
	console.log(this.nowDetailCategory);
	console.log(this.nowRelationCategory);
	console.log(this.nowRelationDetailCategory);
};
/**
 * 도움말 메세지를 설정한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#setMessage
 * @param {string}
 *            msg - 도움말 메세지
 */
gb.validation.OptionDefinition.prototype.setMessage = function(msg) {
	$(this.message).empty();
	$(this.message).text(msg);
};
/**
 * 레이어 분류 목록을 표시한다.
 * 
 * @method gb.validation.OptionDefinition#printCategory
 * @param {boolean}
 *            rel - 릴레이션 레이어 설정 단계
 */
gb.validation.OptionDefinition.prototype.printCategory = function(rel) {
	var className = "gb-optiondefinition-btn-category";
	var alias;
	var optItem;
	var type3;
	if (!rel) {
		this.nowCategory = undefined;
		this.nowOption = undefined;
		this.nowDetailCategory = undefined;
		this.nowRelationCategory = undefined;
		this.nowRelationDetailCategory = undefined;
		this.updateNavigation(0);
	} else {
		var alias = this.nowOption.alias;
		var optItem = this.optItem[alias];
		var type3 = optItem["purpose"];
		this.nowRelationCategory = undefined;
		this.nowRelationDetailCategory = undefined;
		this.updateNavigation(3, true);
		className = "gb-optiondefinition-btn-relationcategory";
	}
	this.setMessage(this.translation.chooseYourCat[this.locale]);
	$(this.optionArea).empty();
	if (rel) {
		var allBtn = $("<button>").text(this.translation.allCat[this.locale]).addClass("btn").addClass("btn-default").addClass(
		"gb-optiondefinition-btn-relationcategory-all").addClass("gb-optiondefinition-btn-with100");
		var col = $("<div>").addClass("col-md-12").addClass("gb-optiondefinition-all-relation").addClass("text-right").append(allBtn);
		var row = $("<div>").addClass("row").append(col);
		$(this.optionArea).append(row);
	}
	var layers = this.getLayerDefinition().getStructure();
	var def = this.getStructure().definition;
	if (rel) {
		for (var i = 0; i < this.getStructure().definition.length; i++) {
			if (this.getStructure().definition[i].name === this.nowCategory) {
				if (this.getStructure().definition[i].hasOwnProperty("options")) {
					if (this.getStructure().definition[i]["options"].hasOwnProperty(type3) && !!this.getStructure().definition[i]["options"][type3]) {
						if (this.getStructure().definition[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (this.getStructure().definition[i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
								if (Array.isArray(this.getStructure().definition[i]["options"][type3][this.nowOption.alias]["relation"])) {
									def = this.getStructure().definition[i]["options"][type3][this.nowOption.alias]["relation"];
									break;
								} else {
									def = [];
								}
							} else {
								def = [];
							}
						} else {
							def = [];
						}
					} else {
						def = [];
					}
				} else {
					def = [];
				}
			} else {
				def = [];
			}
		}
	}

	if (Array.isArray(layers)) {
		var catArea = $("<div>").addClass("row");
		for (var i = 0; i < layers.length; i++) {
			var btn = $("<button>").addClass("btn").addClass("btn-default").addClass(className).addClass("gb-optiondefinition-btn-with100").text(layers[i].name);
			for (var j = 0; j < def.length; j++) {
				if (layers[i].name === def[j].name) {
					$(btn).removeClass("btn-default");
					$(btn).addClass("btn-primary");
				}
			}
			var colArea = $("<div>").addClass("col-md-3").addClass("gb-optiondefinition-all-relation").append(btn);
			$(catArea).append(colArea);
		}
		$(this.optionArea).append(catArea);
	}
};
/**
 * 현재 레이어 분류에 설정가능한 검수 항목을 표시한다.
 * 
 * @method gb.validation.OptionDefinition#printOption
 * @param {HTMLElement}
 *            cat - 레이어 분류명 표시 영역
 * @param {boolean}
 *            navi - 레이어 분류를 현재 선택한 레이어 분류로 업데이트 하지 않음
 */
gb.validation.OptionDefinition.prototype.printOption = function(cat, navi) {
	if (!navi) {
		this.nowCategory = $(cat).text();
	}
	this.nowOption = undefined;
	this.nowDetailCategory = undefined;
	this.nowRelationCategory = undefined;
	this.nowRelationDetailCategory = undefined;

	this.updateNavigation(1);
	this.setMessage(this.translation.chooseYourItem[this.locale]);
	$(this.optionArea).empty();
	var opArea = $("<div>").addClass("row");
	var keys = Object.keys(this.optItem);
	for (var i = 0; i < keys.length; i++) {
		var flag = false;
		if (this.optItem[keys[i]].category.indexOf(this.getQACategory()) !== -1) {
			if (this.getQACategory() === "numetrical") {
				if (this.optItem[keys[i]].version.indexOf(this.getQAVersion()) !== -1) {
					flag = true;
				}
			} else {
				flag = true;
			}
		}
		if (flag) {
			var optBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-option").text(this.optItem[keys[i]].title).attr("value", keys[i]);
			var strc = this.getStructure();
			if (this.optItem[keys[i]].alias === "FeatureFilter") {
				if (strc["filter"] !== null && strc["filter"] !== undefined) {
					var filter = strc["filter"];
					if (Array.isArray(filter["attribute"])) {
						if ($(optBtn).hasClass("btn-default")) {
							$(optBtn).removeClass("btn-default");
						}
						$(optBtn).addClass("btn-primary");						
					}
				}
			} else if (this.optItem[keys[i]].alias === "EditingState") {
				if (strc["filter"] !== null && strc["filter"] !== undefined) {
					var filter = strc["filter"];
					if (Array.isArray(filter["state"])) {
						if ($(optBtn).hasClass("btn-default")) {
							$(optBtn).removeClass("btn-default");
						}
						$(optBtn).addClass("btn-primary");						
					}
				}
			} else if (this.optItem[keys[i]].alias === "BorderLayer") {
				// 현재 버튼이 도곽선 설정인지
				// 도곽선이 설정 되어있는지?
				if (strc["border"] !== null && strc["border"] !== undefined) {
					if ($(optBtn).hasClass("btn-default")) {
						$(optBtn).removeClass("btn-default");
					}
					$(optBtn).addClass("btn-primary");
				}
			} else {
				for (var j = 0; j < strc["definition"].length; j++) {
					// 옵션중에 분류가 현재 선택한 분류랑 같은지?
					if (strc["definition"][j].name === this.nowCategory) {
						if (strc["definition"][j]["options"] !== null && strc["definition"][j]["options"] !== undefined) {
							// 그중에 현재 옵션의 목적이 3 타입중 어떤건지?
							if (strc["definition"][j]["options"].hasOwnProperty("attribute")) {
								if (strc["definition"][j]["options"]["attribute"] !== undefined
										&& strc["definition"][j]["options"]["attribute"] !== null) {
									var type = strc["definition"][j]["options"]["attribute"];
									var keysSecond = Object.keys(type);
									if (keysSecond.indexOf(this.optItem[keys[i]].alias) !== -1) {
										// var icon =
										// $("<i>").addClass("fas").addClass("fa-check");
										// $(optBtn).prepend(icon);
										if ($(optBtn).hasClass("btn-default")) {
											$(optBtn).removeClass("btn-default");
										}
										$(optBtn).addClass("btn-primary");
										continue;
									}
								}
							}
							if (strc["definition"][j]["options"].hasOwnProperty("graphic")) {
								if (strc["definition"][j]["options"]["graphic"] !== undefined
										&& strc["definition"][j]["options"]["graphic"] !== null) {
									var type = strc["definition"][j]["options"]["graphic"];
									var keysSecond = Object.keys(type);
									if (keysSecond.indexOf(this.optItem[keys[i]].alias) !== -1) {
										// var icon =
										// $("<i>").addClass("fas").addClass("fa-check");
										// $(optBtn).prepend(icon);
										if ($(optBtn).hasClass("btn-default")) {
											$(optBtn).removeClass("btn-default");
										}
										$(optBtn).addClass("btn-primary");
										continue;
									}
								}
							}
							if (strc["definition"][j]["options"].hasOwnProperty("adjacent")) {
								if (strc["definition"][j]["options"]["adjacent"] !== undefined
										&& strc["definition"][j]["options"]["adjacent"] !== null) {
									var type = strc["definition"][j]["options"]["adjacent"];
									var keysSecond = Object.keys(type);
									if (keysSecond.indexOf(this.optItem[keys[i]].alias) !== -1) {
										// var icon =
										// $("<i>").addClass("fas").addClass("fa-check");
										// $(optBtn).prepend(icon);
										if ($(optBtn).hasClass("btn-default")) {
											$(optBtn).removeClass("btn-default");
										}
										$(optBtn).addClass("btn-primary");
										continue;
									}
								}
							}
						}
					}
				}
			}
			var colArea = $("<div>").addClass("col-md-3").addClass("gb-optiondefinition-all-relation").append(optBtn);
			$(opArea).append(colArea);
		}
	}
	$(this.optionArea).append(opArea);

};
/**
 * 검수 항목의 세부 항목을 표시한다.
 * 
 * @private
 * @method gb.validation.OptionDefinition#printOptionCategory
 * @param {HTMLElement}
 *            opt - 선택한 검수 조건의 버튼 객체
 * @param {boolean}
 *            navi - 현재 네비게이션 위치로 객체에 업데이트 하지 않음
 * @param {boolean}
 *            sec - 릴레이션 레이어 선택 단계
 * @param {boolean}
 *            all - 릴레이션 레이어에 대한 세부 설정
 */
gb.validation.OptionDefinition.prototype.printOptionCategory = function(opt, navi, sec, all) {
	if (!navi && !sec) {
		this.nowOption = {
				"title" : $(opt).text(),
				"alias" : $(opt).attr("value")
		};
		this.nowDetailCategory = undefined;
		this.nowRelationCategory = undefined;
		this.nowRelationDetailCategory = undefined;
		this.updateNavigation(2);
	} else if (!navi && sec) {
		this.nowRelationDetailCategory = undefined;
		if (all) {
			this.nowRelationCategory = null;
		} else {
			this.nowRelationCategory = $(opt).text();
		}
		this.updateNavigation(4, true);
	} else if (navi && !sec) {
		this.nowDetailCategory = undefined;
		this.nowRelationCategory = undefined;
		this.nowRelationDetailCategory = undefined;
		this.updateNavigation(2);
	} else if (navi && sec) {
		this.nowRelationDetailCategory = undefined;
		if (all) {
			this.updateNavigation(4, true, true);
		} else {
			this.updateNavigation(4, true);				
		}
	}
	$(this.optionArea).empty();

	if (this.nowOption.alias === "FeatureFilter" && !sec) {
		this.setMessage(this.translation.detailGuideNone[this.locale]);
		var addCodeBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-filteradd-nonepurpose").text(
				this.translation.addFilter[this.locale]).addClass("gb-optiondefinition-btn-with100");
		var addCodeBtnCol1 = $("<div>").addClass("col-md-12").append(addCodeBtn);
		var addCodeBtnRow = $("<div>").addClass("row").append(addCodeBtnCol1);

		var clearSettingBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-clearfiltersetting-nonepurpose")
		.text(this.translation.clearsetting[this.locale]).addClass("gb-optiondefinition-btn-with100");
		var clearSettingBtnCol1 = $("<div>").addClass("col-md-12").append(clearSettingBtn);
		var clearSettingBtnRow = $("<div>").addClass("row").append(clearSettingBtnCol1);

		var tupleArea = $("<div>").addClass("gb-optiondefinition-tuplearea");
		$(this.optionArea).append(clearSettingBtnRow);
		$(this.optionArea).append(addCodeBtnRow);
		$(this.optionArea).append(tupleArea);
		console.log(this.getStructure());
		// 현재 분류 등고선
		// this.nowCategory;
		// 현재 검수 항목 단독 존재 오류
		// this.nowOption;
		// 현재 세부 옵션 종류 필터 피규어 톨러런스 릴레이션
		// this.nowDetailCategory;
		// 세부 옵션이 릴레이션일때 릴레이션 분류
		// this.nowRelationCategory;
		// 세부 옵션이 릴레이션을때 릴레이션 세부 옵션 종류
		// this.nowRelationDetailCategory;
		var strc = this.getStructure();
		var ffilter = strc["filter"];
		if (ffilter !== undefined) {
			var fattribute = ffilter["attribute"];
			if (Array.isArray(fattribute)) {
				for (var b = 0; b < fattribute.length; b++) {
					var optItem = this.optItem[this.nowOption.alias];
					var filterArea = $("<div>").addClass("col-md-12").addClass("gb-optiondefinition-filterarea");
					var row = $("<div>").addClass("row");
					if (optItem.filter.key) {
						var attrCol1 = $("<div>").addClass("col-md-1").text(this.translation.attrName[this.locale] + ":");
						var inputAttr = $("<input>").attr({
							"type" : "text",
							"placeholder" : this.translation.attrNameEx[this.locale]
						}).addClass("form-control").addClass("gb-optiondefinition-input-filterkey-fornone");
						if (fattribute[b].key !== undefined && fattribute[b].key !== null) {
							$(inputAttr).val(fattribute[b].key);
						}
						var attrCol2 = $("<div>").addClass("col-md-2").append(inputAttr);

						$(row).append(attrCol1).append(attrCol2);
					}
					if (optItem.filter.values) {
						var filterCol1 = $("<div>").addClass("col-md-1").text(this.translation.acceptVal[this.locale] + ":");
						var inputValues = $("<input>").attr({
							"type" : "text",
							"placeholder" : this.translation.acceptValEx[this.locale]
						}).addClass("form-control").addClass("gb-optiondefinition-input-filtervalues-fornone");
						if (fattribute[b].values !== undefined && fattribute[b].values !== null) {
							$(inputValues).val(fattribute[b].values.toString());
						}
						var filterCol2 = $("<div>").addClass("col-md-6").append(inputValues);
						$(row).append(filterCol1).append(filterCol2);
					}
					var btnDel = $("<button>").addClass("btn").addClass("btn-default").addClass(
					"gb-optiondefinition-btn-deletefilterrow").text(this.translation.deleteFilter[this.locale]).addClass("gb-optiondefinition-btn-with100");
					var delCol1 = $("<div>").addClass("col-md-2").append(btnDel);
					$(row).append(delCol1);

					$(filterArea).append(row);
				}
				// =============필터=================
				var filterAreaRow = $("<div>").addClass("row").append(filterArea);
				var totalArea = $("<div>").addClass("well").append(filterAreaRow);
				$(tupleArea).append(totalArea);
				// ============레이어 코드=============
			}
		}
	} else if (this.nowOption.alias === "EditingState" && !sec) {
		this.setMessage(this.translation.detailGuideNone[this.locale]);
		var addCodeBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-filteradd-nonepurpose").text(
				this.translation.addFilter[this.locale]).addClass("gb-optiondefinition-btn-with100");
		var addCodeBtnCol1 = $("<div>").addClass("col-md-12").append(addCodeBtn);
		var addCodeBtnRow = $("<div>").addClass("row").append(addCodeBtnCol1);

		var clearSettingBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-clearfiltersetting-nonepurpose")
		.text(this.translation.clearsetting[this.locale]).addClass("gb-optiondefinition-btn-with100");
		var clearSettingBtnCol1 = $("<div>").addClass("col-md-12").append(clearSettingBtn);
		var clearSettingBtnRow = $("<div>").addClass("row").append(clearSettingBtnCol1);

		var tupleArea = $("<div>").addClass("gb-optiondefinition-tuplearea");
		$(this.optionArea).append(clearSettingBtnRow);
		$(this.optionArea).append(addCodeBtnRow);
		$(this.optionArea).append(tupleArea);
		console.log(this.getStructure());
		// 현재 분류 등고선
		// this.nowCategory;
		// 현재 검수 항목 단독 존재 오류
		// this.nowOption;
		// 현재 세부 옵션 종류 필터 피규어 톨러런스 릴레이션
		// this.nowDetailCategory;
		// 세부 옵션이 릴레이션일때 릴레이션 분류
		// this.nowRelationCategory;
		// 세부 옵션이 릴레이션을때 릴레이션 세부 옵션 종류
		// this.nowRelationDetailCategory;
		var strc = this.getStructure();
		var ffilter = strc["filter"];
		if (ffilter !== undefined) {
			var fstate = ffilter["state"];
			if (Array.isArray(fstate)) {
				for (var b = 0; b < fstate.length; b++) {
					var optItem = this.optItem[this.nowOption.alias];
					var filterArea = $("<div>").addClass("col-md-12").addClass("gb-optiondefinition-filterarea");
					var row = $("<div>").addClass("row");
					if (optItem.filter.key) {
						var attrCol1 = $("<div>").addClass("col-md-1").text(this.translation.attrName[this.locale] + ":");
						var inputAttr = $("<input>").attr({
							"type" : "text",
							"placeholder" : this.translation.attrNameEx[this.locale]
						}).addClass("form-control").addClass("gb-optiondefinition-input-filterkey-fornone");
						if (fstate[b].key !== undefined && fstate[b].key !== null) {
							$(inputAttr).val(fstate[b].key);
						}
						var attrCol2 = $("<div>").addClass("col-md-2").append(inputAttr);

						$(row).append(attrCol1).append(attrCol2);
					}
					if (optItem.filter.values) {
						var filterCol1 = $("<div>").addClass("col-md-1").text(this.translation.acceptVal[this.locale] + ":");
						var inputValues = $("<input>").attr({
							"type" : "text",
							"placeholder" : this.translation.acceptValEx[this.locale]
						}).addClass("form-control").addClass("gb-optiondefinition-input-filtervalues-fornone");
						if (fstate[b].values !== undefined && fstate[b].values !== null) {
							$(inputValues).val(fstate[b].values.toString());
						}
						var filterCol2 = $("<div>").addClass("col-md-6").append(inputValues);
						$(row).append(filterCol1).append(filterCol2);
					}
					var btnDel = $("<button>").addClass("btn").addClass("btn-default").addClass(
					"gb-optiondefinition-btn-deletefilterrow").text(this.translation.deleteFilter[this.locale]).addClass("gb-optiondefinition-btn-with100");
					var delCol1 = $("<div>").addClass("col-md-2").append(btnDel);
					$(row).append(delCol1);

					$(filterArea).append(row);
				}
				// =============필터=================
				var filterAreaRow = $("<div>").addClass("row").append(filterArea);
				var totalArea = $("<div>").addClass("well").append(filterAreaRow);
				$(tupleArea).append(totalArea);
				// ============레이어 코드=============
			}
		}
	} else if (this.nowOption.alias === "BorderLayer" && !sec) {
		this.setMessage(this.translation.borderLayerMsg[this.locale]);
		var codeSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-border");
		var option = $("<option>").attr("geom", "none").text(this.translation.notSet[this.locale]);
		$(codeSelect).append(option);
		var cat = this.getLayerDefinition().getStructure();
		var borderGeom = this.optItem.BorderLayer.geometry;
		var nowBorder = this.getStructure().border;
		var nowBorderCode = undefined;
		if (nowBorder !== undefined && nowBorder !== null) {
			nowBorderCode = nowBorder.code;
		}
		if (Array.isArray(cat)) {
			for (var i = 0; i < cat.length; i++) {
				if (cat[i].name === this.nowCategory) {
					var layers = cat[i].layers;
					for (var j = 0; j < layers.length; j++) {
						if (Array.isArray(borderGeom)) {
							if (borderGeom.indexOf(layers[j].geometry) !== -1) {
								var option = $("<option>").text(layers[j].code).attr("geom", layers[j].geometry);
								if (layers[j].code === nowBorderCode) {
									$(option).attr("selected", "selected");
								}
								$(codeSelect).append(option);
							}
						}
					}
				}
			}
		}
		var borderCol1 = $("<div>").addClass("col-md-2").addClass("text-center").text(this.translation.border[this.locale]);
		var borderCol2 = $("<div>").addClass("col-md-10").append(codeSelect);
		var row = $("<div>").addClass("row").append(borderCol1).append(borderCol2);
		$(this.optionArea).append(row);
	} else {
		this.setMessage(this.translation.chooseYourDetail[this.locale]);
		var alias = this.nowOption.alias;
		var optItem = this.optItem[alias];
		var type3 = optItem["purpose"];
		var row = $("<div>").addClass("row");
		var className = "gb-optiondefinition-btn-detailcategory";
		if (sec) {
			if (all) {
				className = "gb-optiondefinition-btn-relationdetailcategory-all";
				if (optItem.relation.name) {
					var strc = this.getStructure();
					var layerDef = this.getLayerDefinition().getStructure();
					var names = [];
					for (var a = 0; a < layerDef.length; a++) {
						names.push(layerDef[a].name);
					}
					var flag = false;
					var count = 0;
					var layerMatch = true;
					var relNames = [];
					if (strc["definition"].length > 0) {
						for (var i = 0; i < strc["definition"].length; i++) {
							if (strc["definition"][i]["name"] === this.nowCategory) {
								if (strc["definition"][i].hasOwnProperty("options") && !!strc["definition"][i]["options"]) {
									if (strc["definition"][i]["options"].hasOwnProperty(type3) && !!strc["definition"][i]["options"][type3]) {
										if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
											if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
												continue;
											}
											if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
												if (Array
														.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"])) {
													var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
													for (var j = 0; j < rel.length; j++) {
														relNames.push(rel[j]["name"]);
													}
													for (var b = 0; b < names.length; b++) {
														if (relNames.indexOf(names[b]) === -1) {
															layerMatch = false;
														}
													}
													if (relNames.length === names.length && layerMatch) {
														flag = true;
													}
												}
											}
										}
									}
								}
							}
						}
					}

					var check = $("<input>").attr({
						"type" : "checkbox"
					}).addClass("gb-optiondefinition-check-noparamoption-all").prop("checked", flag);
					var label = $("<label>").append(check).append(this.translation.simpleCheck[this.locale]);
					var col = $("<div>").addClass("col-md-12").append(label);
					$(row).append(col);
				}
				if (optItem.relation.filter.code || optItem.relation.filter.key || optItem.relation.filter.values) {
					var filterBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(className).addClass("gb-optiondefinition-btn-with100").text(
							this.translation.filterValidation[this.locale]).attr("value", "filter");
					var col = $("<div>").addClass("col-md-3").append(filterBtn);
					$(row).append(col);
				}
				if (optItem.relation.figure.code || optItem.relation.figure.key || optItem.relation.figure.values
						|| optItem.relation.figure.number || optItem.relation.figure.condition || optItem.relation.figure.interval) {
					var figBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(className).addClass("gb-optiondefinition-btn-with100").text(
							this.translation.attrValidation[this.locale]).attr("value", "figure");
					var col = $("<div>").addClass("col-md-3").append(figBtn);
					$(row).append(col);
				}
				if (optItem.relation.tolerance.code || optItem.relation.tolerance.value || optItem.relation.tolerance.condition
						|| optItem.relation.tolerance.interval) {
					var tolBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(className).addClass("gb-optiondefinition-btn-with100").text(
							this.translation.condValidation[this.locale]).attr("value", "tolerance");
					var col = $("<div>").addClass("col-md-3").append(tolBtn);
					$(row).append(col);
				}
			} else {
				className = "gb-optiondefinition-btn-relationdetailcategory";
				if (optItem.relation.name) {
					var strc = this.getStructure();
					var flag = false;
					if (strc["definition"].length > 0) {
						for (var i = 0; i < strc["definition"].length; i++) {
							if (strc["definition"][i]["name"] === this.nowCategory) {
								if (strc["definition"][i].hasOwnProperty("options") && !!strc["definition"][i]["options"]) {
									if (strc["definition"][i]["options"].hasOwnProperty(type3) && !!strc["definition"][i]["options"][type3]) {
										if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
											if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
												continue;
											}
											if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
												if (Array
														.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"])) {
													var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
													for (var j = 0; j < rel.length; j++) {
														if (rel[j]["name"] === this.nowRelationCategory) {
															flag = true;
															break;
														}
													}
													if (flag) {
														break;
													}
												}
											}
										}
									}
								}
							}
						}
					}
					var check = $("<input>").attr({
						"type" : "checkbox"
					}).addClass("gb-optiondefinition-check-noparamoption").prop("checked", flag);
					var label = $("<label>").append(check).append(this.translation.simpleCheck[this.locale]);
					var col = $("<div>").addClass("col-md-12").append(label);
					$(row).append(col);
				}
				if (optItem.relation.filter.code || optItem.relation.filter.key || optItem.relation.filter.values) {
					var filterBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(className).addClass("gb-optiondefinition-btn-with100").text(
							this.translation.filterValidation[this.locale]).attr("value", "filter");
					var strcdef = this.getStructure()["definition"];
					console.log(strcdef);
					for (var i = 0; i < strcdef.length; i++) {
						if (strcdef[i]["name"] === this.nowCategory) {
							var optItem = this.optItem[this.nowOption.alias];
							var type3 = optItem["purpose"];
							// 그중에 현재 옵션의 목적이 3 타입중 어떤건지?
							if (strcdef[i]["options"].hasOwnProperty(type3)) {
								if (!strcdef[i]["options"][type3]) {
									continue;
								}
								if (strcdef[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
									if (!strcdef[i]["options"][type3][this.nowOption.alias]) {
										continue;
									}
									if (strcdef[i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
										if (Array.isArray(strcdef[i]["options"][type3][this.nowOption.alias]["relation"])) {
											var rel = strcdef[i]["options"][type3][this.nowOption.alias]["relation"];
											for (var j = 0; j < rel.length; j++) {
												if (rel[j]["name"] === this.nowRelationCategory) {
													if (Array.isArray(rel[j]["filter"])) {
														if (rel[j]["filter"].length > 0) {
															if ($(filterBtn).hasClass("btn-default")) {
																$(filterBtn).removeClass("btn-default");
															}
															$(filterBtn).addClass("btn-primary");	
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					var col = $("<div>").addClass("col-md-3").append(filterBtn);
					$(row).append(col);
				}
				if (optItem.relation.figure.code || optItem.relation.figure.key || optItem.relation.figure.values
						|| optItem.relation.figure.number || optItem.relation.figure.condition || optItem.relation.figure.interval) {
					var figBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(className).addClass("gb-optiondefinition-btn-with100").text(
							this.translation.attrValidation[this.locale]).attr("value", "figure");
					var strcdef = this.getStructure()["definition"];
					console.log(strcdef);
					for (var i = 0; i < strcdef.length; i++) {
						if (strcdef[i]["name"] === this.nowCategory) {
							var optItem = this.optItem[this.nowOption.alias];
							var type3 = optItem["purpose"];
							// 그중에 현재 옵션의 목적이 3 타입중 어떤건지?
							if (strcdef[i]["options"].hasOwnProperty(type3)) {
								if (!strcdef[i]["options"][type3]) {
									continue;
								}
								if (strcdef[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
									if (!strcdef[i]["options"][type3][this.nowOption.alias]) {
										continue;
									}
									if (strcdef[i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
										if (Array.isArray(strcdef[i]["options"][type3][this.nowOption.alias]["relation"])) {
											var rel = strcdef[i]["options"][type3][this.nowOption.alias]["relation"];
											for (var j = 0; j < rel.length; j++) {
												if (rel[j]["name"] === this.nowRelationCategory) {
													if (Array.isArray(rel[j]["figure"])) {
														if (rel[j]["figure"].length > 0) {
															if ($(figBtn).hasClass("btn-default")) {
																$(figBtn).removeClass("btn-default");
															}
															$(figBtn).addClass("btn-primary");	
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					var col = $("<div>").addClass("col-md-3").append(figBtn);
					$(row).append(col);
				}
				if (optItem.relation.tolerance.code || optItem.relation.tolerance.value || optItem.relation.tolerance.condition
						|| optItem.relation.tolerance.interval) {
					var tolBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(className).addClass("gb-optiondefinition-btn-with100").text(
							this.translation.condValidation[this.locale]).attr("value", "tolerance");
					var strcdef = this.getStructure()["definition"];
					console.log(strcdef);
					for (var i = 0; i < strcdef.length; i++) {
						if (strcdef[i]["name"] === this.nowCategory) {
							var optItem = this.optItem[this.nowOption.alias];
							var type3 = optItem["purpose"];
							// 그중에 현재 옵션의 목적이 3 타입중 어떤건지?
							if (strcdef[i]["options"].hasOwnProperty(type3)) {
								if (!strcdef[i]["options"][type3]) {
									continue;
								}
								if (strcdef[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
									if (!strcdef[i]["options"][type3][this.nowOption.alias]) {
										continue;
									}
									if (strcdef[i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
										if (Array.isArray(strcdef[i]["options"][type3][this.nowOption.alias]["relation"])) {
											var rel = strcdef[i]["options"][type3][this.nowOption.alias]["relation"];
											for (var j = 0; j < rel.length; j++) {
												if (rel[j]["name"] === this.nowRelationCategory) {
													if (Array.isArray(rel[j]["tolerance"])) {
														if (rel[j]["tolerance"].length > 0) {
															if ($(tolBtn).hasClass("btn-default")) {
																$(tolBtn).removeClass("btn-default");
															}
															$(tolBtn).addClass("btn-primary");	
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					var col = $("<div>").addClass("col-md-3").append(tolBtn);
					$(row).append(col);
				}
			}
		} else {
			if (optItem.noparam) {

				var strc = this.getStructure();
				var def = strc["definition"];
				var flag = false;
				if (Array.isArray(def)) {
					if (def.length > 0) {
						for (var i = 0; i < def.length; i++) {
							if (this.nowCategory === def[i].name) {
								var options = def[i].options;
								if (options.hasOwnProperty(type3)) {
									var type3Option = options[type3];
									if (type3Option.hasOwnProperty(this.nowOption.alias)) {
										var option = type3Option[this.nowOption.alias];
										if (option !== undefined) {
											flag = true;
										}
									}
								}
							}
						}
					}
				}

				var check = $("<input>").attr({
					"type" : "checkbox"
				}).addClass("gb-optiondefinition-check-noparamoption").prop("checked", flag);
				var label = $("<label>").append(check).append(this.translation.simpleCheck[this.locale]);
				var col = $("<div>").addClass("col-md-12").append(label);
				$(row).append(col);
			}

			if (optItem.filter.code || optItem.filter.key || optItem.filter.values) {
				var strc = this.getStructure()["definition"];
				console.log(strc);
				var filterBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(className).addClass("gb-optiondefinition-btn-with100").text(
						this.translation.filterValidation[this.locale]).attr("value", "filter");
				var strcdef = this.getStructure()["definition"];
				console.log(strcdef);
				for (var i = 0; i < strcdef.length; i++) {
					if (strcdef[i]["name"] === this.nowCategory) {
						var optItem = this.optItem[this.nowOption.alias];
						var type3 = optItem["purpose"];
						// 그중에 현재 옵션의 목적이 3 타입중 어떤건지?
						if (strcdef[i]["options"].hasOwnProperty(type3)) {
							if (!strcdef[i]["options"][type3]) {
								continue;
							}
							if (strcdef[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
								if (!strcdef[i]["options"][type3][this.nowOption.alias]) {
									continue;
								}
								if (strcdef[i]["options"][type3][this.nowOption.alias].hasOwnProperty("filter")) {
									if (Array.isArray(strcdef[i]["options"][type3][this.nowOption.alias]["filter"])) {
										if (strcdef[i]["options"][type3][this.nowOption.alias]["filter"].length > 0) {
											if ($(filterBtn).hasClass("btn-default")) {
												$(filterBtn).removeClass("btn-default");
											}
											$(filterBtn).addClass("btn-primary");	
										}
									}
								}
							}
						}
					}
				}
				var col = $("<div>").addClass("col-md-3").append(filterBtn);
				$(row).append(col);
			}
			if (optItem.figure.code || optItem.figure.key || optItem.figure.values || optItem.figure.number || optItem.figure.condition
					|| optItem.figure.interval) {
				var figBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(className).addClass("gb-optiondefinition-btn-with100").text(
						this.translation.attrValidation[this.locale]).attr("value", "figure");
				var strcdef = this.getStructure()["definition"];
				console.log(strcdef);
				for (var i = 0; i < strcdef.length; i++) {
					if (strcdef[i]["name"] === this.nowCategory) {
						var optItem = this.optItem[this.nowOption.alias];
						var type3 = optItem["purpose"];
						// 그중에 현재 옵션의 목적이 3 타입중 어떤건지?
						if (strcdef[i]["options"].hasOwnProperty(type3)) {
							if (!strcdef[i]["options"][type3]) {
								continue;
							}
							if (strcdef[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
								if (!strcdef[i]["options"][type3][this.nowOption.alias]) {
									continue;
								}
								if (strcdef[i]["options"][type3][this.nowOption.alias].hasOwnProperty("figure")) {
									if (Array.isArray(strcdef[i]["options"][type3][this.nowOption.alias]["figure"])) {
										if (strcdef[i]["options"][type3][this.nowOption.alias]["figure"].length > 0) {
											if ($(figBtn).hasClass("btn-default")) {
												$(figBtn).removeClass("btn-default");
											}
											$(figBtn).addClass("btn-primary");	
										}
									}
								}
							}
						}
					}
				}
				var col = $("<div>").addClass("col-md-3").append(figBtn);
				$(row).append(col);
			}
			if (optItem.tolerance.code || optItem.tolerance.value || optItem.tolerance.condition || optItem.tolerance.interval) {
				var tolBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(className).addClass("gb-optiondefinition-btn-with100").text(
						this.translation.condValidation[this.locale]).attr("value", "tolerance");
				
				var strcdef = this.getStructure()["definition"];
				console.log(strcdef);
				for (var i = 0; i < strcdef.length; i++) {
					if (strcdef[i]["name"] === this.nowCategory) {
						var optItem = this.optItem[this.nowOption.alias];
						var type3 = optItem["purpose"];
						// 그중에 현재 옵션의 목적이 3 타입중 어떤건지?
						if (strcdef[i]["options"].hasOwnProperty(type3)) {
							if (!strcdef[i]["options"][type3]) {
								continue;
							}
							if (strcdef[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
								if (!strcdef[i]["options"][type3][this.nowOption.alias]) {
									continue;
								}
								if (strcdef[i]["options"][type3][this.nowOption.alias].hasOwnProperty("tolerance")) {
									if (Array.isArray(strcdef[i]["options"][type3][this.nowOption.alias]["tolerance"])) {
										if (strcdef[i]["options"][type3][this.nowOption.alias]["tolerance"].length > 0) {
											if ($(tolBtn).hasClass("btn-default")) {
												$(tolBtn).removeClass("btn-default");
											}
											$(tolBtn).addClass("btn-primary");	
										}
									}
								}
							}
						}
					}
				}
				
				var col = $("<div>").addClass("col-md-3").append(tolBtn);
				$(row).append(col);
			}
			if (!optItem.noparam && (optItem.relation.name || (optItem.relation.filter.code || optItem.relation.figure.code || optItem.relation.tolerance.code)) && !sec) {
				var strc = this.getStructure()["definition"];
				console.log(strc);
				var relBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-detailcategory").addClass("gb-optiondefinition-btn-with100").text(this.translation.layerRelation[this.locale]).attr("value", "relation");
				
				var strcdef = this.getStructure()["definition"];
				console.log(strcdef);
				for (var i = 0; i < strcdef.length; i++) {
					if (strcdef[i]["name"] === this.nowCategory) {
						var optItem = this.optItem[this.nowOption.alias];
						var type3 = optItem["purpose"];
						// 그중에 현재 옵션의 목적이 3 타입중 어떤건지?
						if (strcdef[i]["options"].hasOwnProperty(type3)) {
							if (!strcdef[i]["options"][type3]) {
								continue;
							}
							if (strcdef[i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
								if (!strcdef[i]["options"][type3][this.nowOption.alias]) {
									continue;
								}
								if (strcdef[i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
									if (Array.isArray(strcdef[i]["options"][type3][this.nowOption.alias]["relation"])) {
										if (strcdef[i]["options"][type3][this.nowOption.alias]["relation"].length > 0) {
											if ($(relBtn).hasClass("btn-default")) {
												$(relBtn).removeClass("btn-default");
											}
											$(relBtn).addClass("btn-primary");	
										}
									}
								}
							}
						}
					}
				}
				
				var col = $("<div>").addClass("col-md-3").append(relBtn);
				$(row).append(col);
			}
		}
		$(this.optionArea).append(row);
	}
};
/**
 * 조건의 세부 설정 입력 폼을 표시한다.
 * 
 * @method gb.validation.OptionDefinition#printDetailForm
 * @param {HTMLElement}
 *            optcat - 검수 조건 버튼 객체
 * @param {boolean}
 *            navi - 현재 위치를 객체 내에 업데이트 하지 않음
 * @param {boolean}
 *            sec - 릴레이션 레이어 설정 단계
 * @param {boolean}
 *            all - 모든 분류 선택 여부
 */
gb.validation.OptionDefinition.prototype.printDetailForm = function(optcat, navi, sec, all) {
	if (!sec) {
		if (!navi) {
			this.nowDetailCategory = {
					"title" : $(optcat).text(),
					"alias" : $(optcat).attr("value")
			};
		}
		this.nowRelationCategory = undefined;
		this.nowRelationDetailCategory = undefined;
		this.updateNavigation(3);
	} else {
		if (!navi) {
			this.nowRelationDetailCategory = {
					"title" : $(optcat).text(),
					"alias" : $(optcat).attr("value")
			};
			if (all) {
				this.updateNavigation(5, false, all );	
			} else {
				this.updateNavigation(5);
			}
		}
	}

	this.setMessage(this.translation.detailGuide[this.locale]);
	$(this.optionArea).empty();

	var type = $(optcat).attr("value");
	if (type === "filter") {
		var addCodeBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-filteraddcode").text(
				this.translation.addLayerCode[this.locale]).addClass("gb-optiondefinition-btn-with100");
		var addCodeBtnCol1 = $("<div>").addClass("col-md-12").append(addCodeBtn);
		var addCodeBtnRow = $("<div>").addClass("row").append(addCodeBtnCol1);

		var clearSettingBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-clearfiltersetting")
		.text(this.translation.clearsetting[this.locale]).addClass("gb-optiondefinition-btn-with100");
		var clearSettingBtnCol1 = $("<div>").addClass("col-md-12").append(clearSettingBtn);
		var clearSettingBtnRow = $("<div>").addClass("row").append(clearSettingBtnCol1);

		var tupleArea = $("<div>").addClass("gb-optiondefinition-tuplearea");
		$(this.optionArea).append(clearSettingBtnRow);
		$(this.optionArea).append(addCodeBtnRow);
		$(this.optionArea).append(tupleArea);
		console.log(this.getStructure());
		// 현재 분류 등고선
		// this.nowCategory;
		// 현재 검수 항목 단독 존재 오류
		// this.nowOption;
		// 현재 세부 옵션 종류 필터 피규어 톨러런스 릴레이션
		// this.nowDetailCategory;
		// 세부 옵션이 릴레이션일때 릴레이션 분류
		// this.nowRelationCategory;
		// 세부 옵션이 릴레이션을때 릴레이션 세부 옵션 종류
		// this.nowRelationDetailCategory;
		var strc = this.getStructure();
		for (var i = 0; i < strc["definition"].length; i++) {
			// 옵션중에 분류가 현재 선택한 분류랑 같은지?
			if (strc["definition"][i].name === this.nowCategory) {
				var optItem = this.optItem[this.nowOption.alias];
				var type3 = optItem["purpose"];
				// 그중에 현재 옵션의 목적이 3 타입중 어떤건지?
				if (strc["definition"][i]["options"].hasOwnProperty(type3)) {
					// 릴레이션인지 확인
					var nowFilter = [];
					if (sec) {
						var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
						// 모든 분류 조회인지
						if (all) {
							// 임시 배열 객체
							var tempAttrArr = [];
							// 같은지
							var isSame = true;
							// 모든 릴레이션에서
							for (var j = 0; j < rel.length; j++) {
								var relObj = rel[j];
								// 필터객체를 꺼내서
								if (Array.isArray(relObj["filter"])) {
									// 모든 코드 조건인지 확인
									if (relObj["filter"].length === 1 && relObj["filter"][0]["code"] === null) {
										// 애트리뷰트 객체를 꺼내서
										var attrArr = relObj["filter"][0]["attribute"];
										// 배열인지 확인해서
										if (Array.isArray(attrArr)) {
											if (j === 0) {
												// 최초값을 비교를 위해 임시 저장
												for (var k = 0; k < attrArr.length; k++) {
													var jsonStr = JSON.stringify(attrArr[k]);
													var njson = JSON.parse(jsonStr);
													tempAttrArr.push(njson);
												}	
											} else {
												for (var k = 0; k < attrArr.length; k++) {
													var jsonStr = JSON.stringify(attrArr[k]);
													if (!Object.is(JSON.stringify(tempAttrArr[k]), jsonStr)) {
														isSame = false;
													}
													if (!isSame) {
														console.log("다름");
													}
												}	
											}
										}
									}
								}
							}
							if (tempAttrArr.length === 0) {
								isSame = false;
							}
							// 같으면
							if (isSame) {
								var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.code[this.locale] + ":");
								var codeSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-filtercode");
								var allCode = $("<option>").text(this.translation.applyAll[this.locale]).attr("geom", "none");
								$(codeSelect).append(allCode);

								var codeCol2 = $("<div>").addClass("col-md-7").append(codeSelect);

								var delBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(
								"gb-optiondefinition-btn-deletelayerfilter").text(this.translation.deleteLayerCode[this.locale]).addClass("gb-optiondefinition-btn-with100");
								var delBtnCol = $("<div>").addClass("col-md-2").append(delBtn);

								var addBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-addfilter").addClass("gb-optiondefinition-btn-with100").text(this.translation.addFilter[this.locale]);
								var addBtnCol = $("<div>").addClass("col-md-2").append(addBtn);

								var addFilterRow = $("<div>").addClass("row").append(codeCol1).append(codeCol2).append(delBtnCol).append(addBtnCol);
								var filterArea = $("<div>").addClass("col-md-12").addClass("gb-optiondefinition-filterarea");

								for (var b = 0; b < tempAttrArr.length; b++) {
									var optItem = this.optItem[this.nowOption.alias];
									var row = $("<div>").addClass("row");
									if (optItem.filter.key) {
										var attrCol1 = $("<div>").addClass("col-md-1").text(this.translation.attrName[this.locale] + ":");
										var inputAttr = $("<input>").attr({
											"type" : "text",
											"placeholder" : this.translation.attrNameEx[this.locale]
										}).addClass("form-control").addClass("gb-optiondefinition-input-filterkey");
										if (tempAttrArr[b].key !== undefined && tempAttrArr[b].key !== null) {
											$(inputAttr).val(tempAttrArr[b].key);
										}
										var attrCol2 = $("<div>").addClass("col-md-2").append(inputAttr);

										$(row).append(attrCol1).append(attrCol2);
									}
									if (optItem.filter.values) {
										var filterCol1 = $("<div>").addClass("col-md-1").text(this.translation.acceptVal[this.locale] + ":");
										var inputValues = $("<input>").attr({
											"type" : "text",
											"placeholder" : this.translation.acceptValEx[this.locale]
										}).addClass("form-control").addClass("gb-optiondefinition-input-filtervalues");
										if (tempAttrArr[b].values !== undefined && tempAttrArr[b].values !== null) {
											$(inputValues).val(tempAttrArr[b].values.toString());
										}
										var filterCol2 = $("<div>").addClass("col-md-6").append(inputValues);
										$(row).append(filterCol1).append(filterCol2);
									}
									var btnDel = $("<button>").addClass("btn").addClass("btn-default").addClass(
									"gb-optiondefinition-btn-deletefilterrow").text(this.translation.deleteFilter[this.locale]).addClass("gb-optiondefinition-btn-with100");
									var delCol1 = $("<div>").addClass("col-md-2").append(btnDel);
									$(row).append(delCol1);

									$(filterArea).append(row);
								}
								// =============필터=================
								var filterAreaRow = $("<div>").addClass("row").append(filterArea);
								var totalArea = $("<div>").addClass("well").append(addFilterRow).append(filterAreaRow);
								$(tupleArea).append(totalArea);
								// ============레이어 코드=============
							}
							return;
						}
						if (Array.isArray(rel)) {
							for (var j = 0; j < rel.length; j++) {
								if (rel[j]["name"] === this.nowRelationCategory) {
									if (rel[j].hasOwnProperty(type)) {
										nowFilter = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j][type];
									}
								}
							}
						}
					} else {
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty(type)) {
									if (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias][type])) {
										nowFilter = strc["definition"][i]["options"][type3][this.nowOption.alias][type];
									}
								}								
							}
						}
					}
					if (!Array.isArray(nowFilter)) {
						nowFilter = [];
					}
					for (var a = 0; a < nowFilter.length; a++) {
						// ============레이어 코드=============
						var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.code[this.locale] + ":");
						var codeSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-filtercode");
						var cat = this.getLayerDefinition().getStructure();

						if (Array.isArray(cat)) {
							for (var j = 0; j < cat.length; j++) {
								var category;
								// 릴레이션인지 확인
								if (sec) {
									category = this.nowRelationCategory;
								} else {
									category = this.nowCategory;
								}
								// 선언된 분류와 비교중 현재 분류와 같은지?
								if (cat[j].name === category) {
									var layers = cat[j].layers;
									var allCode = $("<option>").text(this.translation.applyAll[this.locale]).attr("geom", "none");
									$(codeSelect).append(allCode);
									for (var k = 0; k < layers.length; k++) {
										var option = $("<option>").text(layers[k].code).attr("geom", layers[k].geometry);
										// 분류안의 코드와 현재 선언된 분류가 같은지?
										if (layers[k].code === nowFilter[a].code) {
											$(option).attr("selected", "selected");
										}
										$(codeSelect).append(option);
									}
									if (nowFilter[a].code === null) {
										$(allCode).attr("selected", "selected");
									}
								}
							}
						}
						var codeCol2 = $("<div>").addClass("col-md-7").append(codeSelect);

						var delBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(
						"gb-optiondefinition-btn-deletelayerfilter").text(this.translation.deleteLayerCode[this.locale]).addClass("gb-optiondefinition-btn-with100");
						var delBtnCol = $("<div>").addClass("col-md-2").append(delBtn);

						var addBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-addfilter").addClass("gb-optiondefinition-btn-with100").text(this.translation.addFilter[this.locale]);
						var addBtnCol = $("<div>").addClass("col-md-2").append(addBtn);

						var addFilterRow = $("<div>").addClass("row").append(codeCol1).append(codeCol2).append(delBtnCol).append(addBtnCol);
						var filterArea = $("<div>").addClass("col-md-12").addClass("gb-optiondefinition-filterarea");
						// =============필터=================
						// nowFilter[a].code
						for (var b = 0; b < nowFilter[a].attribute.length; b++) {
							var optItem = this.optItem[this.nowOption.alias];
							var row = $("<div>").addClass("row");
							if (optItem.filter.key) {
								var attrCol1 = $("<div>").addClass("col-md-1").text(this.translation.attrName[this.locale] + ":");
								var inputAttr = $("<input>").attr({
									"type" : "text",
									"placeholder" : this.translation.attrNameEx[this.locale]
								}).addClass("form-control").addClass("gb-optiondefinition-input-filterkey");
								if (nowFilter[a].attribute[b].key !== undefined && nowFilter[a].attribute[b].key !== null) {
									$(inputAttr).val(nowFilter[a].attribute[b].key);
								}
								var attrCol2 = $("<div>").addClass("col-md-2").append(inputAttr);

								$(row).append(attrCol1).append(attrCol2);
							}
							if (optItem.filter.values) {
								var filterCol1 = $("<div>").addClass("col-md-1").text(this.translation.acceptVal[this.locale] + ":");
								var inputValues = $("<input>").attr({
									"type" : "text",
									"placeholder" : this.translation.acceptValEx[this.locale]
								}).addClass("form-control").addClass("gb-optiondefinition-input-filtervalues");
								if (nowFilter[a].attribute[b].values !== undefined && nowFilter[a].attribute[b].values !== null) {
									$(inputValues).val(nowFilter[a].attribute[b].values.toString());
								}
								var filterCol2 = $("<div>").addClass("col-md-6").append(inputValues);
								$(row).append(filterCol1).append(filterCol2);
							}
							var btnDel = $("<button>").addClass("btn").addClass("btn-default").addClass(
							"gb-optiondefinition-btn-deletefilterrow").text(this.translation.deleteFilter[this.locale]).addClass("gb-optiondefinition-btn-with100");
							var delCol1 = $("<div>").addClass("col-md-2").append(btnDel);
							$(row).append(delCol1);

							$(filterArea).append(row);
						}
						// =============필터=================
						var filterAreaRow = $("<div>").addClass("row").append(filterArea);
						var totalArea = $("<div>").addClass("well").append(addFilterRow).append(filterAreaRow);
						$(tupleArea).append(totalArea);
						// ============레이어 코드=============
					}
				}
			}
		}
	} else if (type === "figure") {
		var clearSettingBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-clearfiguresetting")
		.text(this.translation.clearsetting[this.locale]).addClass("gb-optiondefinition-btn-with100");
		var clearSettingBtnCol1 = $("<div>").addClass("col-md-12").append(clearSettingBtn);
		var clearSettingBtnRow = $("<div>").addClass("row").append(clearSettingBtnCol1);

		var addCodeBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-figureaddcode").text(
				this.translation.addLayerCode[this.locale]).addClass("gb-optiondefinition-btn-with100");
		var addCodeBtnCol1 = $("<div>").addClass("col-md-12").append(addCodeBtn);
		var addCodeBtnRow = $("<div>").addClass("row").append(addCodeBtnCol1);
		var tupleArea = $("<div>").addClass("gb-optiondefinition-tuplearea");
		$(this.optionArea).append(clearSettingBtnRow);
		$(this.optionArea).append(addCodeBtnRow);
		$(this.optionArea).append(tupleArea);

		var strc = this.getStructure();
		for (var i = 0; i < strc["definition"].length; i++) {
			// 옵션중에 분류가 현재 선택한 분류랑 같은지?
			if (strc["definition"][i].name === this.nowCategory) {
				var optItem = this.optItem[this.nowOption.alias];
				var type3 = optItem["purpose"];
				// 그중에 현재 옵션의 목적이 3 타입중 어떤건지?
				if (strc["definition"][i]["options"].hasOwnProperty(type3)) {
					if (!strc["definition"][i]["options"][type3]) {
						continue;
					}
					var nowFilter = [];
					// ===========================================
					if (sec) {
						var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
						// 모든 분류 조회인지
						if (all) {
							// 임시 배열 객체
							var tempAttrArr = [];
							// 같은지
							var isSame = true;
							// 모든 릴레이션에서
							for (var j = 0; j < rel.length; j++) {
								var relObj = rel[j];
								// 필터객체를 꺼내서
								if (Array.isArray(relObj["figure"])) {
									// 모든 코드 조건인지 확인
									if (relObj["figure"].length === 1 && relObj["figure"][0]["code"] === null) {
										// 애트리뷰트 객체를 꺼내서
										var attrArr = relObj["figure"][0]["attribute"];
										// 배열인지 확인해서
										if (Array.isArray(attrArr)) {
											if (j === 0) {
												// 최초값을 비교를 위해 임시 저장
												for (var k = 0; k < attrArr.length; k++) {
													var jsonStr = JSON.stringify(attrArr[k]);
													var njson = JSON.parse(jsonStr);
													tempAttrArr.push(njson);
												}	
											} else {
												for (var k = 0; k < attrArr.length; k++) {
													var jsonStr = JSON.stringify(attrArr[k]);
													if (!Object.is(JSON.stringify(tempAttrArr[k]), jsonStr)) {
														isSame = false;
													}
													if (!isSame) {
														console.log("다름");
													}
												}	
											}
										}
									}
								}
							}
							if (tempAttrArr.length === 0) {
								isSame = false;
							}
							// 같으면
							if (isSame) {
								var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.code[this.locale] + ":");
								
								var codeSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-figurecode");
								var allCode = $("<option>").text(this.translation.applyAll[this.locale]).attr("geom", "none");
								$(codeSelect).append(allCode);
								var codeCol2 = $("<div>").addClass("col-md-7").append(codeSelect);

								var delBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(
								"gb-optiondefinition-btn-deletelayerfigure").text(this.translation.deleteLayerCode[this.locale]).addClass("gb-optiondefinition-btn-with100");
								var delBtnCol = $("<div>").addClass("col-md-2").append(delBtn);

								var addBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-addfigure")
								.text(this.translation.addAttr[this.locale]).addClass("gb-optiondefinition-btn-with100");
								var addBtnCol = $("<div>").addClass("col-md-2").append(addBtn);

								var addFigureRow = $("<div>").addClass("row").append(codeCol1).append(codeCol2).append(delBtnCol).append(addBtnCol);
								
								var figureArea = $("<div>").addClass("col-md-12").addClass("gb-optiondefinition-figurearea");

								// 임시 저장된 최초값으로
								for (var b = 0; b < tempAttrArr.length; b++) {
									var connFilterRow = $("<div>").addClass("row");
									var connFilterCol1 = $("<div>").addClass("col-md-2").text(this.translation.connFilter[this.locale] + ":");

									var filterSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-figuretofilter");
									var noSelectOpt = $("<option>").attr("value", "null").text(this.translation.noselect[this.locale]);
									$(filterSelect).append(noSelectOpt);
									
									if (!optItem.relation.figure.filter) {
										$(filterSelect).prop("disabled", true);
									}
									var connFilterCol2 = $("<div>").addClass("col-md-10").append(filterSelect);

									$(connFilterRow).append(connFilterCol1).append(connFilterCol2);
									
									var row = $("<div>").addClass("row");
									
									var attrCol1 = $("<div>").addClass("col-md-1").text(this.translation.attrName[this.locale] + ":");
									var inputAttr = $("<input>").attr({
										"type" : "text",
										"placeholder" : this.translation.attrNameEx[this.locale]
									}).addClass("form-control").addClass("gb-optiondefinition-input-figurekey");
									if (tempAttrArr[b].key !== undefined && tempAttrArr[b].key !== null) {
										$(inputAttr).val(tempAttrArr[b].key);
									}
									if (!optItem.relation.figure.key) {
										$(inputAttr).prop("disabled", true);
									}
									var attrCol2 = $("<div>").addClass("col-md-2").append(inputAttr);

									$(row).append(attrCol1).append(attrCol2);

									var filterCol1 = $("<div>").addClass("col-md-1").text(this.translation.acceptVal[this.locale] + ":");
									var inputValues = $("<input>").attr({
										"type" : "text",
										"placeholder" : this.translation.acceptValEx[this.locale]
									}).addClass("form-control").addClass("gb-optiondefinition-input-figurevalues");
									if (tempAttrArr[b].values !== undefined && tempAttrArr[b].values !== null) {
										$(inputValues).val(tempAttrArr[b].values.toString());
									}
									if (!optItem.relation.figure.values) {
										$(inputValues).prop("disabled", true);
									}
									var filterCol2 = $("<div>").addClass("col-md-8").append(inputValues);
									$(row).append(filterCol1).append(filterCol2);

									var row2 = $("<div>").addClass("row");

									var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.figure[this.locale] + ":");
									var inputNum = $("<input>").attr({
										"type" : "number",
										"placeholder" : this.translation.figureInterEx[this.locale]
									}).addClass("form-control").addClass("gb-optiondefinition-input-figurenumber");
									if (tempAttrArr[b].number !== undefined &&tempAttrArr[b].number !== null) {
										$(inputNum).val(tempAttrArr[b].number);
									}
									if (!optItem.figure.number) {
										$(inputNum).prop("disabled", true);
									}
									var numCol2 = $("<div>").addClass("col-md-3").append(inputNum);
									$(row2).append(numCol1).append(numCol2);

									var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.condition[this.locale] + ":");
									var condSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-figurecondition");
									var optionNone = $("<option>").text(this.translation.noselect[this.locale]).attr("value", "null");
									var optionEqual = $("<option>").text(this.translation.equal[this.locale]).attr("value", "equal");
									var optionOver = $("<option>").text(this.translation.excess[this.locale]).attr("value", "over");
									var optionUnder = $("<option>").text(this.translation.under[this.locale]).attr("value", "under");
									var optionAndOver = $("<option>").text(this.translation.andOver[this.locale]).attr("value", "andover");
									var optionAndUnder = $("<option>").text(this.translation.andUnder[this.locale]).attr("value", "andunder");
									$(condSelect).append(optionNone).append(optionEqual).append(optionOver).append(optionUnder).append(optionAndOver).append(optionAndUnder);
									if (tempAttrArr[b].condition !== undefined && tempAttrArr[b].condition !== null) {
										$(condSelect).val(tempAttrArr[b].condition);
									}
									if (!optItem.relation.figure.condition) {
										$(condSelect).prop("disabled", true);
									}
									var condCol2 = $("<div>").addClass("col-md-2").append(condSelect);
									$(row2).append(codeCol1).append(condCol2);

									var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.interval[this.locale] + ":");
									var inputNum = $("<input>").attr({
										"type" : "number",
										"placeholder" : this.translation.figureInterEx[this.locale]
									}).addClass("form-control").addClass("gb-optiondefinition-input-figureinterval");
									if (tempAttrArr[b].interval !== undefined &&tempAttrArr[b].interval !== null) {
										$(inputNum).val(tempAttrArr[b].interval);
									}
									if (!optItem.relation.figure.interval) {
										$(inputNum).prop("disabled", true);
									}
									var numCol2 = $("<div>").addClass("col-md-2").append(inputNum);
									$(row2).append(numCol1).append(numCol2);

									var btnDel = $("<button>").addClass("btn").addClass("btn-default").addClass(
									"gb-optiondefinition-btn-deletefigurerow").text(this.translation.deleteAttr[this.locale]).addClass("gb-optiondefinition-btn-with100");
									var delCol1 = $("<div>").addClass("col-md-2").append(btnDel);
									$(row2).append(delCol1);

									var outerRow = $("<div>").addClass("gb-optiondefinition-figurearea-row").append(connFilterRow).append(row).append(row2);
									$(figureArea).append(outerRow);
								}
								// =============필터=================
								var figureAreaRow = $("<div>").addClass("row").append(figureArea);
								var totalArea = $("<div>").addClass("well").append(addFigureRow).append(figureAreaRow);
								$(tupleArea).append(totalArea);
								// ============레이어 코드=============
							}
							return;
						}
						if (Array.isArray(rel)) {
							for (var j = 0; j < rel.length; j++) {
								if (rel[j]["name"] === this.nowRelationCategory) {
									if (rel[j].hasOwnProperty(type)) {
										nowFilter = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j][type];
									}
								}
							}
						}
					} else {
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty(type)) {
									if (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias][type])) {
										nowFilter = strc["definition"][i]["options"][type3][this.nowOption.alias][type];
									}
								}
							}
						}
					}
					if (!Array.isArray(nowFilter)) {
						nowFilter = [];
					}
					// ===========================================
					if (sec) {
						var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
						if (Array.isArray(rel)) {
							for (var j = 0; j < rel.length; j++) {
								if (rel[j]["name"] === this.nowRelationCategory) {
									if (rel[j].hasOwnProperty(type)) {
										nowFilter = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j][type];
									}
								}
							}
						}
					} else {
						if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
							if (!!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
								if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty(type)) {
									if (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias][type])) {
										nowFilter = strc["definition"][i]["options"][type3][this.nowOption.alias][type];
									}
								}
							}
						}
					}
					if (!Array.isArray(nowFilter)) {
						nowFilter = [];
					}
					for (var a = 0; a < nowFilter.length; a++) {
						// ============레이어 코드=============
						var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.code[this.locale] + ":");
						var codeSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-figurecode");
						var cat = this.getLayerDefinition().getStructure();

						if (Array.isArray(cat)) {
							for (var j = 0; j < cat.length; j++) {
								var category;
								// 릴레이션인지 확인
								if (sec) {
									category = this.nowRelationCategory;
								} else {
									category = this.nowCategory;
								}
								// 선언된 분류와 비교중 현재 분류와 같은지?
								if (cat[j].name === category) {
									var layers = cat[j].layers;
									var allCode = $("<option>").text(this.translation.applyAll[this.locale]).attr("geom", "none");
									$(codeSelect).append(allCode);
									for (var k = 0; k < layers.length; k++) {
										var option = $("<option>").text(layers[k].code).attr("geom", layers[k].geometry);
										// 분류안의 코드와 현재 선언된 분류가 같은지?
										if (layers[k].code === nowFilter[a].code) {
											$(option).attr("selected", "selected");
										}
										$(codeSelect).append(option);
									}
									if (nowFilter[a].code === null) {
										$(allCode).attr("selected", "selected");
									}
								}
							}
						}

						var codeCol2 = $("<div>").addClass("col-md-7").append(codeSelect);

						var delBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(
						"gb-optiondefinition-btn-deletelayerfigure").text(this.translation.deleteLayerCode[this.locale]).addClass("gb-optiondefinition-btn-with100");
						var delBtnCol = $("<div>").addClass("col-md-2").append(delBtn);

						var addBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-addfigure")
						.text(this.translation.addAttr[this.locale]).addClass("gb-optiondefinition-btn-with100");
						var addBtnCol = $("<div>").addClass("col-md-2").append(addBtn);

						var addFigureRow = $("<div>").addClass("row").append(codeCol1).append(codeCol2).append(delBtnCol).append(addBtnCol);
						var figureArea = $("<div>").addClass("col-md-12").addClass("gb-optiondefinition-figurearea");
						// =============피규어=============
						for (var b = 0; b < nowFilter[a].attribute.length; b++) {
							var optItem = this.optItem[this.nowOption.alias];

							var connFilterRow = $("<div>").addClass("row");

							var connFilterCol1 = $("<div>").addClass("col-md-2").text(this.translation.connFilter[this.locale] + ":");

							var filterSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-figuretofilter");
							var noSelectOpt = $("<option>").attr("value", "null").text(this.translation.noselect[this.locale]);
							$(filterSelect).append(noSelectOpt);

							// 필터에서 같은 코드를 찾아서 그 애트리뷰트들의 목록을 보여주기
							console.log(this.nowCategory);
							console.log(this.nowOption);
							console.log(this.nowDetailCategory);
							console.log(this.nowRelationCategory);
							console.log(this.nowRelationDetailCategory);
							console.log(this.getStructure());
							var definition = this.getStructure()["definition"];
							for (var c = 0; c < definition.length; c++) {
								var name = definition[c]["name"];
								if (name === this.nowCategory) {
									if (definition[c].hasOwnProperty("options")) {
										var type3 = optItem["purpose"];
										if (definition[c]["options"].hasOwnProperty(type3)) {
											if (definition[c]["options"][type3].hasOwnProperty(this.nowOption["alias"])) {
												if (definition[c]["options"][type3][this.nowOption["alias"]].hasOwnProperty("filter")) {
													var nowCode = $(codeSelect).val();
													var filters = definition[c]["options"][type3][this.nowOption["alias"]]["filter"];
													if (!filters) {
														continue;
													}
													for (var j = 0; j < filters.length; j++) {
														if(filters[j]["code"] === nowCode) {
															if (filters[j].hasOwnProperty("attribute") && Array.isArray(filters[j]["attribute"])) {
																var attributes = filters[j]["attribute"];
																for (var k = 0; k < attributes.length; k++) {
																	var attrLabel = this.translation.attrName[this.locale];
																	var attrName = attributes[k]["key"];
																	var valuesLabel = this.translation.acceptVal[this.locale];
																	var values = attributes[k]["values"];
																	var opt = $("<option>").attr("value", k).text(attrLabel+": "+attrName+" / "+valuesLabel+": "+values);
																	if(nowFilter[a]["attribute"][b]["fidx"] !== undefined && nowFilter[a]["attribute"][b]["fidx"] === k){
																		$(opt).prop("selected", true);
																	}
																	$(filterSelect).append(opt);
																}
															}
														}
													}
												}
											}
										}
									}
								} else {
									continue;
								}
							}

							if (!optItem.figure.filter) {
								$(filterSelect).prop("disabled", true);
							}
							var connFilterCol2 = $("<div>").addClass("col-md-10").append(filterSelect);

							$(connFilterRow).append(connFilterCol1).append(connFilterCol2);

							var row = $("<div>").addClass("row");

							var attrCol1 = $("<div>").addClass("col-md-1").text(this.translation.attrName[this.locale] + ":");
							var inputAttr = $("<input>").attr({
								"type" : "text",
								"placeholder" : this.translation.attrNameEx[this.locale]
							}).addClass("form-control").addClass("gb-optiondefinition-input-figurekey");
							if (nowFilter[a].attribute[b].key !== undefined && nowFilter[a].attribute[b].key !== null) {
								$(inputAttr).val(nowFilter[a].attribute[b].key);
							}
							if (!optItem.figure.key) {
								$(inputAttr).prop("disabled", true);
							}
							var attrCol2 = $("<div>").addClass("col-md-2").append(inputAttr);

							$(row).append(attrCol1).append(attrCol2);

							var filterCol1 = $("<div>").addClass("col-md-1").text(this.translation.acceptVal[this.locale] + ":");
							var inputValues = $("<input>").attr({
								"type" : "text",
								"placeholder" : this.translation.acceptValEx[this.locale]
							}).addClass("form-control").addClass("gb-optiondefinition-input-figurevalues");
							if (nowFilter[a].attribute[b].values !== undefined && nowFilter[a].attribute[b].values !== null) {
								$(inputValues).val(nowFilter[a].attribute[b].values.toString());
							}
							if (!optItem.figure.values) {
								$(inputValues).prop("disabled", true);
							}
							var filterCol2 = $("<div>").addClass("col-md-8").append(inputValues);
							$(row).append(filterCol1).append(filterCol2);

							var row2 = $("<div>").addClass("row");

							var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.figure[this.locale] + ":");
							var inputNum = $("<input>").attr({
								"type" : "number",
								"placeholder" : this.translation.figureInterEx[this.locale]
							}).addClass("form-control").addClass("gb-optiondefinition-input-figurenumber");
							if (nowFilter[a].attribute[b].number !== undefined && nowFilter[a].attribute[b].number !== null) {
								$(inputNum).val(nowFilter[a].attribute[b].number);
							}
							if (!optItem.figure.number) {
								$(inputNum).prop("disabled", true);
							}
							var numCol2 = $("<div>").addClass("col-md-3").append(inputNum);
							$(row2).append(numCol1).append(numCol2);

							var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.condition[this.locale] + ":");
							var condSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-figurecondition");
							var optionNone = $("<option>").text(this.translation.noselect[this.locale]).attr("value", "null");
							var optionEqual = $("<option>").text(this.translation.equal[this.locale]).attr("value", "equal");
							var optionOver = $("<option>").text(this.translation.excess[this.locale]).attr("value", "over");
							var optionUnder = $("<option>").text(this.translation.under[this.locale]).attr("value", "under");
							var optionAndOver = $("<option>").text(this.translation.andOver[this.locale]).attr("value", "andover");
							var optionAndUnder = $("<option>").text(this.translation.andUnder[this.locale]).attr("value", "andunder");
							$(condSelect).append(optionNone).append(optionEqual).append(optionOver).append(optionUnder).append(optionAndOver).append(optionAndUnder);
							if (nowFilter[a].attribute[b].condition !== undefined && nowFilter[a].attribute[b].condition !== null) {
								$(condSelect).val(nowFilter[a].attribute[b].condition);
							}
							if (!optItem.figure.condition) {
								$(condSelect).prop("disabled", true);
							}
							var codeCol2 = $("<div>").addClass("col-md-2").append(condSelect);
							$(row2).append(codeCol1).append(codeCol2);

							var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.interval[this.locale] + ":");
							var inputNum = $("<input>").attr({
								"type" : "number",
								"placeholder" : this.translation.figureInterEx[this.locale]
							}).addClass("form-control").addClass("gb-optiondefinition-input-figureinterval");
							if (nowFilter[a].attribute[b].interval !== undefined && nowFilter[a].attribute[b].interval !== null) {
								$(inputNum).val(nowFilter[a].attribute[b].interval);
							}
							if (!optItem.figure.interval) {
								$(inputNum).prop("disabled", true);
							}
							var numCol2 = $("<div>").addClass("col-md-2").append(inputNum);
							$(row2).append(numCol1).append(numCol2);

							var btnDel = $("<button>").addClass("btn").addClass("btn-default").addClass(
							"gb-optiondefinition-btn-deletefigurerow").text(this.translation.deleteAttr[this.locale]).addClass("gb-optiondefinition-btn-with100");
							var delCol1 = $("<div>").addClass("col-md-2").append(btnDel);
							$(row2).append(delCol1);

							var outerRow = $("<div>").addClass("gb-optiondefinition-figurearea-row").append(connFilterRow).append(row).append(row2);
							$(figureArea).append(outerRow);
						}
						// =============피규어=============
						var figureAreaRow = $("<div>").addClass("row").append(figureArea);
						var totalArea = $("<div>").addClass("well").append(addFigureRow).append(figureAreaRow);
						$(tupleArea).append(totalArea);
						// ============레이어 코드=============
					}
				}
			}
		}
	} else if (type === "tolerance") {
		var clearSettingBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(
		"gb-optiondefinition-btn-cleartolerancesetting").text(this.translation.clearsetting[this.locale]).addClass("gb-optiondefinition-btn-with100");
		var clearSettingBtnCol1 = $("<div>").addClass("col-md-12").append(clearSettingBtn);
		var clearSettingBtnRow = $("<div>").addClass("row").append(clearSettingBtnCol1);

		var addCodeBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-toleranceaddcode").text(
				this.translation.addLayerCode[this.locale]).addClass("gb-optiondefinition-btn-with100");
		var addCodeBtnCol1 = $("<div>").addClass("col-md-12").append(addCodeBtn);
		var addCodeBtnRow = $("<div>").addClass("row").append(addCodeBtnCol1);

		var tupleArea = $("<div>").addClass("gb-optiondefinition-tuplearea");
		$(this.optionArea).append(clearSettingBtnRow);
		$(this.optionArea).append(addCodeBtnRow);
		$(this.optionArea).append(tupleArea);

		var strc = this.getStructure();
		for (var i = 0; i < strc["definition"].length; i++) {
			// 옵션중에 분류가 현재 선택한 분류랑 같은지?
			if (strc["definition"][i].name === this.nowCategory) {
				var optItem = this.optItem[this.nowOption.alias];
				var type3 = optItem["purpose"];
				// 그중에 현재 옵션의 목적이 3 타입중 어떤건지?
				if (strc["definition"][i]["options"].hasOwnProperty(type3)) {
					// 릴레이션인지 확인
					var nowFilter = [];
					if (strc["definition"][i]["options"][type3].hasOwnProperty(this.nowOption.alias)) {
						if (!strc["definition"][i]["options"][type3][this.nowOption.alias]) {
							continue;
						}
						if (sec) {
							if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty("relation")) {
								var rel = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"];
								if (Array.isArray(rel)) {
									for (var j = 0; j < rel.length; j++) {
										if (rel[j]["name"] === this.nowRelationCategory) {
											if (rel[j].hasOwnProperty(type)) {
												nowFilter = strc["definition"][i]["options"][type3][this.nowOption.alias]["relation"][j][type];
											}
										}
									}
								}
							}
						} else {
							if (strc["definition"][i]["options"][type3][this.nowOption.alias].hasOwnProperty(type)) {
								if (Array.isArray(strc["definition"][i]["options"][type3][this.nowOption.alias][type])) {
									nowFilter = strc["definition"][i]["options"][type3][this.nowOption.alias][type];
								}
							}
						}
					}
					if (!Array.isArray(nowFilter)) {
						nowFilter = [];
					}
					for (var a = 0; a < nowFilter.length; a++) {
						// ============레이어 코드=============
						var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.code[this.locale] + ":");
						var codeSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-tolerancecode");
						var cat = this.getLayerDefinition().getStructure();

						if (Array.isArray(cat)) {
							for (var j = 0; j < cat.length; j++) {
								var category;
								// 릴레이션인지 확인
								if (sec) {
									category = this.nowRelationCategory;
								} else {
									category = this.nowCategory;
								}
								// 선언된 분류와 비교중 현재 분류와 같은지?
								if (cat[j].name === category) {
									var layers = cat[j].layers;
									var allCode = $("<option>").text(this.translation.applyAll[this.locale]).attr("geom", "none");
									$(codeSelect).append(allCode);
									for (var k = 0; k < layers.length; k++) {
										var option = $("<option>").text(layers[k].code).attr("geom", layers[k].geometry);
										// 분류안의 코드와 현재 선언된 분류가 같은지?
										if (layers[k].code === nowFilter[a].code) {
											$(option).attr("selected", "selected");
										}
										$(codeSelect).append(option);
									}
									if (nowFilter[a].code === null) {
										$(allCode).attr("selected", "selected");
									}
								}
							}
						}
						var codeCol2 = $("<div>").addClass("col-md-9").append(codeSelect);

						var delBtn = $("<button>").addClass("btn").addClass("btn-default").addClass(
						"gb-optiondefinition-btn-deletelayertolerance").text(this.translation.deleteLayerCode[this.locale]).addClass("gb-optiondefinition-btn-with100");
						var delBtnCol = $("<div>").addClass("col-md-2").append(delBtn);

						/*
						 * var addBtn = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-btn-addtolerance").text("조건
						 * 추가").css( "width", "100%"); var addBtnCol = $("<div>").addClass("col-md-2").append(addBtn);
						 */

						var addFigureRow = $("<div>").addClass("row").append(codeCol1).append(codeCol2).append(delBtnCol);
						var figureArea = $("<div>").addClass("col-md-12").addClass("gb-optiondefinition-tolerancearea");
						// ============================
						var optItem = this.optItem[this.nowOption.alias];
						var row = $("<div>").addClass("row");

						var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.figure[this.locale] + ":");
						var inputNum = $("<input>").attr({
							"type" : "number",
							"placeholder" : this.translation.figureInterEx[this.locale]
						}).addClass("form-control").addClass("gb-optiondefinition-input-tolerancevalue");
						if (nowFilter[a].value !== undefined && nowFilter[a].value !== null) {
							$(inputNum).val(nowFilter[a].value);
						}
						if (!optItem.tolerance.value) {
							$(inputNum).prop("disabled", true);
						}
						var numCol2 = $("<div>").addClass("col-md-3").append(inputNum);
						$(row).append(numCol1).append(numCol2);

						var codeCol1 = $("<div>").addClass("col-md-1").text(this.translation.condition[this.locale] + ":");
						var condSelect = $("<select>").addClass("form-control").addClass("gb-optiondefinition-select-tolerancecondition");
						var optionNone = $("<option>").text(this.translation.noselect[this.locale]).attr("value", "null");
						var optionEqual = $("<option>").text(this.translation.equal[this.locale]).attr("value", "equal");
						var optionOver = $("<option>").text(this.translation.excess[this.locale]).attr("value", "over");
						var optionUnder = $("<option>").text(this.translation.under[this.locale]).attr("value", "under");
						var optionAndOver = $("<option>").text(this.translation.andOver[this.locale]).attr("value", "andover");
						var optionAndUnder = $("<option>").text(this.translation.andUnder[this.locale]).attr("value", "andunder");
						$(condSelect).append(optionNone).append(optionEqual).append(optionOver).append(optionUnder).append(optionAndOver).append(optionAndUnder);
						if (nowFilter[a].condition !== undefined && nowFilter[a].condition !== null) {
							$(condSelect).val(nowFilter[a].condition);
						}
						if (!optItem.tolerance.condition) {
							$(condSelect).prop("disabled", true);
						}
						var codeCol2 = $("<div>").addClass("col-md-3").append(condSelect);
						$(row).append(codeCol1).append(codeCol2);

						var numCol1 = $("<div>").addClass("col-md-1").text(this.translation.interval[this.locale] + ":");
						var inputNum = $("<input>").attr({
							"type" : "number",
							"placeholder" : this.translation.figureInterEx[this.locale]
						}).addClass("form-control").addClass("gb-optiondefinition-input-toleranceinterval");
						if (nowFilter[a].interval !== undefined && nowFilter[a].interval !== null) {
							$(inputNum).val(nowFilter[a].interval);
						}
						if (!optItem.tolerance.interval) {
							$(inputNum).prop("disabled", true);
						}
						var numCol2 = $("<div>").addClass("col-md-3").append(inputNum);
						$(row).append(numCol1).append(numCol2);

						/*
						 * var btnDel = $("<button>").addClass("btn").addClass("btn-default").addClass("gb-optiondefinition-delete-row").text("조건
						 * 삭제").css( "width", "100%"); var delCol1 = $("<div>").addClass("col-md-2").append(btnDel);
						 * $(row).append(delCol1);
						 */

						$(figureArea).append(row);
						// ============================
						var figureAreaRow = $("<div>").addClass("row").append(figureArea);
						var totalArea = $("<div>").addClass("well").append(addFigureRow).append(figureAreaRow);
						$(tupleArea).append(totalArea);
						// ============레이어 코드=============
					}
				}
			} else {
				continue;
			}
		}
	} else if (type === "relation") {
		this.printCategory(true);
	}
};
/**
 * 검수 항목 정의 파일 업로드 폼 객체를 반환한다.
 * 
 * @method gb.validation.OptionDefinition#getInputFile
 * @return {HTMLElement} 파일 업로드 폼 객체
 */
gb.validation.OptionDefinition.prototype.getInputFile = function() {
	return this.file;
};
/**
 * 현재 검수 항목 정의 구조로 화면을 업데이트한다.
 * 
 * @method gb.validation.OptionDefinition#updateStructure
 */
gb.validation.OptionDefinition.prototype.updateStructure = function() {
	console.log(this.getStructure());
	$(this.optionArea).empty();
	var strc = this.getStructure();
	this.init();
};
/**
 * 레이어 정의 구조를 설정한다.
 * 
 * @method gb.validation.OptionDefinition#setLayerDefinition
 * @param {Object}
 *            strc - 레이어 정의 구조
 */
gb.validation.OptionDefinition.prototype.setLayerDefinition = function(strc) {
	this.layerDef = strc;
};
/**
 * 레이어 정의 구조를 반환한다.
 * 
 * @method gb.validation.OptionDefinition#getLayerDefinition
 * @return {Object} 레이어 정의 구조
 */
gb.validation.OptionDefinition.prototype.getLayerDefinition = function() {
	return this.layerDef;
};
/**
 * 검수 항목 정의 구조를 초기화한다.
 * 
 * @method gb.validation.OptionDefinition#clearStructure
 */
gb.validation.OptionDefinition.prototype.clearStructure = function() {
	this.structure = {
			"border" : null,
			"definition" : []
	};
};
/**
 * 검수 항목 정의 구조를 설정한다.
 * 
 * @method gb.validation.OptionDefinition#setStructure
 * @param {Object}
 *            strc - 검수 항목 정의 구조
 * @return {boolean} 검수 항목 정의 구조가 제대로 설정됨
 */
gb.validation.OptionDefinition.prototype.setStructure = function(strc) {
	var isOK = true;
	var borderElem = [ "code", "geometry" ];
	var defElem = [ "name", "options" ];
	var optionElem = [ "attribute", "graphic", "adjacent" ];
	var optionItem = Object.keys(this.optItem);
	optionItem.push("run");
	var optionNameElem = [ "filter", "figure", "tolerance", "relation", "run" ];
	var filterElem = [ "code", "attribute" ];
	var filterAttributeElem = [ "key", "values" ];
	var figureElem = [ "code", "attribute" ];
	var figureAttributeElem = [ "fidx", "key", "values", "number", "condition", "interval" ];
	var toleranceElem = [ "code", "value", "condition", "interval" ];
	var relationElem = [ "name", "filter", "figure", "tolerance" ];
	var layerStructure = this.getLayerDefinition().getStructure();
	if (strc.hasOwnProperty("border")) {
		var border = strc["border"];
		if (border !== null) {
			if (!border.hasOwnProperty("code")) {
				isOK = false;
				this.setMessagePopup("danger", this.translation.nobordercode[this.locale]);
			}
			if (!border.hasOwnProperty("geometry")) {
				isOK = false;
				this.setMessagePopup("danger", this.translation.nobordergeom[this.locale]);
			}
		}
	}
	if (strc.hasOwnProperty("definition")) {
		if (Array.isArray(strc["definition"])) {
			var definitions = strc["definition"];
			for (var i = 0; i < definitions.length; i++) {
				var definition = definitions[i];
				var defKeys = Object.keys(definition);
				for (var j = 0; j < defKeys.length; j++) {
					if (defElem.indexOf(defKeys[j]) === -1) {
						isOK = false;
						this.setMessagePopup("danger", defKeys[j] + this.translation.invalidkeyname[this.locale]);
					}
					if (!definitions[i].hasOwnProperty("name")) {
						isOK = false;
						this.setMessagePopup("danger", this.translation.nocatname[this.locale]);
					}
					if (defKeys[j] === "options") {
						var options = definitions[i]["options"];
						if (options !== undefined && options !== null) {
							var optionKeys = Object.keys(options);
							for (var k = 0; k < optionKeys.length; k++) {
								if (optionElem.indexOf(optionKeys[k]) === -1) {
									isOK = false;
									this.setMessagePopup("danger", optionKeys[k] + " " + this.translation.invalidkeyname[this.locale]);
								} else {
									if (options.hasOwnProperty(optionKeys[k])) {
										var type3Obj = options[optionKeys[k]];
										if (type3Obj !== undefined && type3Obj !== null) {
											var optionItemKeys = Object.keys(type3Obj);
											for (var l = 0; l < optionItemKeys.length; l++) {
												if (optionItem.indexOf(optionItemKeys[l]) === -1) {
													isOK = false;
													this.setMessagePopup("danger", optionItemKeys[l]
													+ this.translation.invaliditem[this.locale]);
													console.error("");
												} else {
													// 검수 항목 설정 객체 filter,
													// figure 등이
													// 들어있음
													var type4Obj = type3Obj[optionItemKeys[l]];
													type4Keys = Object.keys(type4Obj);
													for (var m = 0; m < type4Keys.length; m++) {
														if (optionNameElem.indexOf(type4Keys[m]) === -1) {
															isOK = false;
															this.setMessagePopup("danger", type4Keys[m] + " "
																	+ this.translation.invalidkeyname[this.locale]);
															console.error("");
														} else {
															if (type4Keys[m] === "filter") {
																var filterArr = type4Obj["filter"];
																if (Array.isArray(filterArr)) {
																	for (var n = 0; n < filterArr.length; n++) {
																		var filterKeys = Object.keys(filterArr[n]);
																		for (var o = 0; o < filterKeys.length; o++) {
																			if (filterElem.indexOf(filterKeys[o]) === -1) {
																				isOK = false;
																				this.setMessagePopup("danger", filterKeys[o] + " "
																						+ this.translation.invalidkeyname[this.locale]);
																			} else {
																				if (filterKeys[o] === "code") {
																					if (filterArr[n]["code"] !== null
																							&& filterArr[n]["code"] !== undefined) {
																						var nowName = definitions[i]["name"];
																						var nowCode = filterArr[n]["code"];
																						if (Array.isArray(layerStructure)) {
																							var nameExist = false;
																							var codeExist = false;
																							for (var e = 0; e < layerStructure.length; e++) {
																								if (layerStructure[e]
																								.hasOwnProperty("name")) {
																									if (layerStructure[e]["name"] === nowName) {
																										nameExist = true;
																										if (layerStructure[e]
																										.hasOwnProperty("layers")) {
																											if (Array
																													.isArray(layerStructure[e]["layers"])) {
																												var layers = layerStructure[e]["layers"];
																												for (var f = 0; f < layers.length; f++) {
																													if (layers[f]
																													.hasOwnProperty("code")) {
																														if (layers[f]["code"] === nowCode) {
																															codeExist = true;
																														}
																													}
																												}
																											}
																										} else {
																											isOK = false;
																											this
																											.setMessagePopup(
																													"danger",
																													nowCode
																													+ this.translation.nolayercode[this.locale]);
																										}
																									}
																								}
																							}
																							if (nameExist === false && codeExist === false) {
																								isOK = false;
																								this
																								.setMessagePopup(
																										"danger",
																										this.translation.cat[this.locale]
																										+ ": "
																										+ nowName
																										+ ", "
																										+ this.translation.cat[this.locale]
																										+ ": "
																										+ nowCode
																										+ " "
																										+ this.translation.nolayercode[this.locale]);
																							}
																						}
																					}
																				} else if (filterKeys[o] === "attribute") {
																					if (Array.isArray(filterArr[n]["attribute"])) {
																						var attributes = filterArr[n]["attribute"];
																						for (var p = 0; p < attributes.length; p++) {
																							var attrKeys = Object.keys(attributes[p]);
																							for (var q = 0; q < attrKeys.length; q++) {
																								if (filterAttributeElem
																										.indexOf(attrKeys[q]) === -1) {
																									isOK = false;
																									this
																									.setMessagePopup(
																											"danger",
																											attrKeys[q]
																											+ " "
																											+ this.translation.invalidkeyname[this.locale]);
																									console
																									.error(attrKeys[q]
																									+ " "
																									+ this.translation.invalidkeyname[this.locale]);
																								} else {
																									if (attrKeys[q] === "values") {
																										if (!Array
																												.isArray(attributes[p]["values"])
																												&& attributes[p]["values"] !== null) {
																											isOK = false;
																											this
																											.setMessagePopup(
																													"danger",
																													this.translation.valuesnullorarr[this.locale]);
																											console.error("");
																										}
																									}
																								}
																							}
																						}
																					} else {
																						isOK = false;
																						this
																						.setMessagePopup(
																								"danger",
																								this.translation.attrnullorarr[this.locale]);
																						console.error("");
																					}
																				}
																			}
																		}
																	}
																} else if (filterArr !== null && !Array.isArray(filterArr)) {
																	isOK = false;
																	this.setMessagePopup("danger",
																			this.translation.filternullorarr[this.locale]);
																	console.error("");
																}
															} else if (type4Keys[m] === "figure") {
																var figureArr = type4Obj["figure"];
																if (Array.isArray(figureArr)) {
																	for (var n = 0; n < figureArr.length; n++) {
																		var figureKeys = Object.keys(figureArr[n]);
																		for (var o = 0; o < figureKeys.length; o++) {
																			if (figureElem.indexOf(figureKeys[o]) === -1) {
																				isOK = false;
																				this.setMessagePopup("danger", figureKeys[o] + " "
																						+ this.translation.invalidkeyname[this.locale]);
																				console.error("");
																			} else {
																				if (figureKeys[o] === "code") {
																					if (figureArr[n]["code"] !== null
																							&& figureArr[n]["code"] !== undefined) {
																						var nowName = definitions[i]["name"];
																						var nowCode = figureArr[n]["code"];
																						if (Array.isArray(layerStructure)) {
																							var nameExist = false;
																							var codeExist = false;
																							for (var e = 0; e < layerStructure.length; e++) {
																								if (layerStructure[e]
																								.hasOwnProperty("name")) {
																									if (layerStructure[e]["name"] === nowName) {
																										nameExist = true;
																										if (layerStructure[e]
																										.hasOwnProperty("layers")) {
																											if (Array
																													.isArray(layerStructure[e]["layers"])) {
																												var layers = layerStructure[e]["layers"];
																												for (var f = 0; f < layers.length; f++) {
																													if (layers[f]
																													.hasOwnProperty("code")) {
																														if (layers[f]["code"] === nowCode) {
																															codeExist = true;
																														}
																													}
																												}
																											}
																										} else {
																											isOK = false;
																											this
																											.setMessagePopup(
																													"danger",
																													nowCode
																													+ " "
																													+ this.translation.nolayercode[this.locale]);
																										}
																									}
																								}
																							}
																							if (nameExist === false && codeExist === false) {
																								isOK = false;
																								this
																								.setMessagePopup(
																										"danger",
																										this.translation.cat[this.locale]
																										+ ": "
																										+ nowName
																										+ ", "
																										+ this.translation.cat[this.locale]
																										+ ": "
																										+ nowCode
																										+ " "
																										+ this.translation.nolayercode[this.locale]);
																							}
																						}
																					}
																				} else if (figureKeys[o] === "attribute") {
																					if (Array.isArray(figureArr[n]["attribute"])) {
																						var attributes = figureArr[n]["attribute"];
																						for (var p = 0; p < attributes.length; p++) {
																							var attrKeys = Object.keys(attributes[p]);
																							for (var q = 0; q < attrKeys.length; q++) {
																								if (figureAttributeElem
																										.indexOf(attrKeys[q]) === -1) {
																									isOK = false;
																									this
																									.setMessagePopup(
																											"danger",
																											attrKeys[q]
																											+ " "
																											+ this.translation.invalidkeyname[this.locale]);
																									console.error("");
																								} else {
																									if (attrKeys[q] === "values") {
																										if (!Array
																												.isArray(attributes[p]["values"])
																												&& attributes[p]["values"] !== null) {
																											isOK = false;
																											this
																											.setMessagePopup(
																													"danger",
																													this.translation.valuesnullorarr[this.locale]);
																											console.error("");
																										}
																									}
																								}
																							}
																						}
																					} else {
																						isOK = false;
																						this
																						.setMessagePopup(
																								"danger",
																								this.translation.attrnullorarr[this.locale]);
																						console.error("");
																					}
																				}
																			}
																		}
																	}
																} else if (figureArr !== null && !Array.isArray(figureArr)) {
																	isOK = false;
																	this.setMessagePopup("danger",
																			this.translation.figurenullorarr[this.locale]);
																	console.error("");
																}
															} else if (type4Keys[m] === "tolerance") {
																var toleranceArr = type4Obj["tolerance"];
																if (Array.isArray(toleranceArr)) {
																	for (var n = 0; n < toleranceArr.length; n++) {
																		var toleranceKeys = Object.keys(toleranceArr[n]);
																		for (var o = 0; o < toleranceKeys.length; o++) {
																			if (toleranceElem.indexOf(toleranceKeys[o]) === -1) {
																				isOK = false;
																				this.setMessagePopup("danger", toleranceKeys[o] + " "
																						+ this.translation.invalidkeyname[this.locale]);
																			}
																			if (toleranceKeys[o] === "code") {
																				if (toleranceArr[n]["code"] !== null
																						&& toleranceArr[n]["code"] !== undefined) {
																					var nowName = definitions[i]["name"];
																					var nowCode = toleranceArr[n]["code"];
																					if (Array.isArray(layerStructure)) {
																						var nameExist = false;
																						var codeExist = false;
																						for (var e = 0; e < layerStructure.length; e++) {
																							if (layerStructure[e].hasOwnProperty("name")) {
																								if (layerStructure[e]["name"] === nowName) {
																									nameExist = true;
																									if (layerStructure[e]
																									.hasOwnProperty("layers")) {
																										if (Array
																												.isArray(layerStructure[e]["layers"])) {
																											var layers = layerStructure[e]["layers"];
																											for (var f = 0; f < layers.length; f++) {
																												if (layers[f]
																												.hasOwnProperty("code")) {
																													if (layers[f]["code"] === nowCode) {
																														codeExist = true;
																													}
																												}
																											}
																										}
																									} else {
																										isOK = false;
																										this
																										.setMessagePopup(
																												"danger",
																												nowCode
																												+ " "
																												+ this.translation.nolayercode[this.locale]);
																									}
																								}
																							}
																						}
																						if (nameExist === false && codeExist === false) {
																							isOK = false;
																							this
																							.setMessagePopup(
																									"danger",
																									this.translation.cat[this.locale]
																									+ ": "
																									+ nowName
																									+ ", "
																									+ this.translation.cat[this.locale]
																									+ ": "
																									+ nowCode
																									+ " "
																									+ this.translation.nolayercode[this.locale]);
																						}
																					}
																				}
																			}
																		}
																	}
																} else if (toleranceArr !== null && !Array.isArray(toleranceArr)) {
																	isOK = false;
																	this.setMessagePopup("danger",
																			this.translation.tolernullorarr[this.locale]);
																	console.error("");
																}
															} else if (type4Keys[m] === "relation") {
																var relationArr = type4Obj["relation"];
																if (Array.isArray(relationArr)) {
																	for (var a = 0; a < relationArr.length; a++) {
																		var rel = relationArr[a];
																		var relKeys = Object.keys(rel);
																		for (var b = 0; b < relKeys.length; b++) {
																			if (relationElem.indexOf(relKeys[b]) === -1) {
																				isOK = false;
																				this.setMessagePopup("danger", relKeys[b] + " "
																						+ this.translation.invalidkeyname[this.locale]);
																			} else {
																				if (relKeys[b] === "filter") {
																					var filterArr = rel["filter"];
																					if (Array.isArray(filterArr)) {
																						for (var n = 0; n < filterArr.length; n++) {
																							var filterKeys = Object.keys(filterArr[n]);
																							for (var o = 0; o < filterKeys.length; o++) {
																								if (filterElem.indexOf(filterKeys[o]) === -1) {
																									isOK = false;
																									this
																									.setMessagePopup(
																											"danger",
																											filterKeys[o]
																											+ " "
																											+ this.translation.invalidkeyname[this.locale]);
																								} else {
																									if (filterKeys[o] === "code") {
																										if (filterArr[n]["code"] !== null
																												&& filterArr[n]["code"] !== undefined) {
																											var nowName = definitions[i]["name"];
																											var nowCode = filterArr[n]["code"];
																											if (Array
																													.isArray(layerStructure)) {
																												var nameExist = false;
																												var codeExist = false;
																												for (var e = 0; e < layerStructure.length; e++) {
																													if (layerStructure[e]
																													.hasOwnProperty("name")) {
																														if (layerStructure[e]["name"] === nowName) {
																															nameExist = true;
																															if (layerStructure[e]
																															.hasOwnProperty("layers")) {
																																if (Array
																																		.isArray(layerStructure[e]["layers"])) {
																																	var layers = layerStructure[e]["layers"];
																																	for (var f = 0; f < layers.length; f++) {
																																		if (layers[f]
																																		.hasOwnProperty("code")) {
																																			if (layers[f]["code"] === nowCode) {
																																				codeExist = true;
																																			}
																																		}
																																	}
																																}
																															} else {
																																isOK = false;
																																this
																																.setMessagePopup(
																																		"danger",
																																		nowCode
																																		+ " "
																																		+ this.translation.nolayercode[this.locale]);
																															}
																														}
																													}
																												}
																												if (nameExist === false
																														&& codeExist === false) {
																													isOK = false;
																													this
																													.setMessagePopup(
																															"danger",
																															this.translation.cat[this.locale]
																															+ ": "
																															+ nowName
																															+ ", "
																															+ this.translation.cat[this.locale]
																															+ ": "
																															+ nowCode
																															+ " "
																															+ this.translation.nolayercode[this.locale]);
																												}
																											}
																										}
																									} else if (filterKeys[o] === "attribute") {
																										if (Array
																												.isArray(filterArr[n]["attribute"])) {
																											var attributes = filterArr[n]["attribute"];
																											for (var p = 0; p < attributes.length; p++) {
																												var attrKeys = Object
																												.keys(attributes[p]);
																												for (var q = 0; q < attrKeys.length; q++) {
																													if (filterAttributeElem
																															.indexOf(attrKeys[q]) === -1) {
																														isOK = false;
																														this
																														.setMessagePopup(
																																"danger",
																																attrKeys[q]
																																+ " "
																																+ this.translation.invalidkeyname[this.locale]);
																														console
																														.error(attrKeys[q]
																														+ " "
																														+ this.translation.invalidkeyname[this.locale]);
																													} else {
																														if (attrKeys[q] === "values") {
																															if (!Array
																																	.isArray(attributes[p]["values"])
																																	&& attributes[p]["values"] !== null) {
																																isOK = false;
																																this
																																.setMessagePopup(
																																		"danger",
																																		this.translation.valuesnullorarr[this.locale]);
																																console
																																.error("");
																															}
																														}
																													}
																												}
																											}
																										} else {
																											isOK = false;
																											this
																											.setMessagePopup(
																													"danger",
																													this.translation.attrnullorarr[this.locale]);
																											console.error("");
																										}
																									}
																								}
																							}
																						}
																					} else if (filterArr !== null
																							&& !Array.isArray(filterArr)) {
																						isOK = false;
																						this
																						.setMessagePopup(
																								"danger",
																								this.translation.filternullorarr[this.locale]);
																						console.error("");
																					}
																				} else if (relKeys[b] === "figure") {
																					var figureArr = rel["figure"];
																					if (Array.isArray(figureArr)) {
																						for (var n = 0; n < figureArr.length; n++) {
																							var figureKeys = Object.keys(figureArr[n]);
																							for (var o = 0; o < figureKeys.length; o++) {
																								if (figureElem.indexOf(figureKeys[o]) === -1) {
																									isOK = false;
																									this
																									.setMessagePopup(
																											"danger",
																											figureKeys[o]
																											+ " "
																											+ this.translation.invalidkeyname[this.locale]);
																									console.error("");
																								} else {
																									if (figureKeys[o] === "code") {
																										if (figureArr[n]["code"] !== null
																												&& figureArr[n]["code"] !== undefined) {
																											var nowName = definitions[i]["name"];
																											var nowCode = figureArr[n]["code"];
																											if (Array
																													.isArray(layerStructure)) {
																												var nameExist = false;
																												var codeExist = false;
																												for (var e = 0; e < layerStructure.length; e++) {
																													if (layerStructure[e]
																													.hasOwnProperty("name")) {
																														if (layerStructure[e]["name"] === nowName) {
																															nameExist = true;
																															if (layerStructure[e]
																															.hasOwnProperty("layers")) {
																																if (Array
																																		.isArray(layerStructure[e]["layers"])) {
																																	var layers = layerStructure[e]["layers"];
																																	for (var f = 0; f < layers.length; f++) {
																																		if (layers[f]
																																		.hasOwnProperty("code")) {
																																			if (layers[f]["code"] === nowCode) {
																																				codeExist = true;
																																			}
																																		}
																																	}
																																}
																															} else {
																																isOK = false;
																																this
																																.setMessagePopup(
																																		"danger",
																																		nowCode
																																		+ " "
																																		+ this.translation.nolayercode[this.locale]);
																															}
																														}
																													}
																												}
																												if (nameExist === false
																														&& codeExist === false) {
																													isOK = false;
																													this
																													.setMessagePopup(
																															"danger",
																															this.translation.cat[this.locale]
																															+ ": "
																															+ nowName
																															+ ", "
																															+ this.translation.cat[this.locale]
																															+ ": "
																															+ nowCode
																															+ " "
																															+ this.translation.nolayercode[this.locale]);
																												}
																											}
																										}
																									} else if (figureKeys[o] === "attribute") {
																										if (Array
																												.isArray(figureArr[n]["attribute"])) {
																											var attributes = figureArr[n]["attribute"];
																											for (var p = 0; p < attributes.length; p++) {
																												var attrKeys = Object
																												.keys(attributes[p]);
																												for (var q = 0; q < attrKeys.length; q++) {
																													if (figureAttributeElem
																															.indexOf(attrKeys[q]) === -1) {
																														isOK = false;
																														this
																														.setMessagePopup(
																																"danger",
																																attrKeys[q]
																																+ " "
																																+ this.translation.invalidkeyname[this.locale]);
																														console.error("");
																													} else {
																														if (attrKeys[q] === "values") {
																															if (!Array
																																	.isArray(attributes[p]["values"])
																																	&& attributes[p]["values"] !== null) {
																																isOK = false;
																																this
																																.setMessagePopup(
																																		"danger",
																																		this.translation.valuesnullorarr[this.locale]);
																																console
																																.error("");
																															}
																														}
																													}
																												}
																											}
																										} else {
																											isOK = false;
																											this
																											.setMessagePopup(
																													"danger",
																													this.translation.attrnullorarr[this.locale]);
																											console.error("");
																										}
																									}
																								}
																							}
																						}
																					} else if (figureArr !== null
																							&& !Array.isArray(figureArr)) {
																						isOK = false;
																						this
																						.setMessagePopup(
																								"danger",
																								this.translation.figurenullorarr[this.locale]);
																						console.error("");
																					}
																				} else if (relKeys[b] === "tolerance") {
																					var toleranceArr = rel["tolerance"];
																					if (Array.isArray(toleranceArr)) {
																						for (var n = 0; n < toleranceArr.length; n++) {
																							var toleranceKeys = Object
																							.keys(toleranceArr[n]);
																							for (var o = 0; o < toleranceKeys.length; o++) {
																								if (toleranceElem.indexOf(toleranceKeys[o]) === -1) {
																									isOK = false;
																									this
																									.setMessagePopup(
																											"danger",
																											toleranceKeys[o]
																											+ " "
																											+ this.translation.invalidkeyname[this.locale]);
																								}
																								if (toleranceKeys[o] === "code") {
																									if (toleranceArr[n]["code"] !== null
																											&& toleranceArr[n]["code"] !== undefined) {
																										var nowName = definitions[i]["name"];
																										var nowCode = toleranceArr[n]["code"];
																										if (Array.isArray(layerStructure)) {
																											var nameExist = false;
																											var codeExist = false;
																											for (var e = 0; e < layerStructure.length; e++) {
																												if (layerStructure[e]
																												.hasOwnProperty("name")) {
																													if (layerStructure[e]["name"] === nowName) {
																														nameExist = true;
																														if (layerStructure[e]
																														.hasOwnProperty("layers")) {
																															if (Array
																																	.isArray(layerStructure[e]["layers"])) {
																																var layers = layerStructure[e]["layers"];
																																for (var f = 0; f < layers.length; f++) {
																																	if (layers[f]
																																	.hasOwnProperty("code")) {
																																		if (layers[f]["code"] === nowCode) {
																																			codeExist = true;
																																		}
																																	}
																																}
																															}
																														} else {
																															isOK = false;
																															this
																															.setMessagePopup(
																																	"danger",
																																	nowCode
																																	+ " "
																																	+ this.translation.nolayercode[this.locale]);
																														}
																													}
																												}
																											}
																											if (nameExist === false
																													&& codeExist === false) {
																												isOK = false;
																												this
																												.setMessagePopup(
																														"danger",
																														this.translation.cat[this.locale]
																														+ ": "
																														+ nowName
																														+ ", "
																														+ this.translation.cat[this.locale]
																														+ ": "
																														+ nowCode
																														+ " "
																														+ this.translation.nolayercode[this.locale]);
																											}
																										}
																									}
																								}
																							}
																						}
																					} else if (toleranceArr !== null
																							&& !Array.isArray(toleranceArr)) {
																						isOK = false;
																						this
																						.setMessagePopup(
																								"danger",
																								this.translation.tolernullorarr[this.locale]);
																						console.error("");
																					}
																				}
																			}
																		}
																	}
																} else if (relationArr !== null && !Array.isArray(relationArr)) {
																	isOK = false;
																	this.setMessagePopup("danger", relnullorarr);
																	console.error("");
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		} else {
			isOK = false;
			this.setMessagePopup("danger", " " + this.translation.defnull[this.locale]);
		}
	} else {
		isOK = false;
		this.setMessagePopup("danger", " " + this.translation.failimport[this.locale]);
	}
	if (isOK) {
		this.structure = strc;
		this.setMessagePopup("success", this.translation.validItemChgMsg[this.locale]);
	}
	if (this.isEmpty()) {
		this.setMessagePopup("warning", this.translation.emptyobj[this.locale]);
	}
	return isOK;
};
/**
 * 검수 항목 정의 구조를 반환한다.
 * 
 * @method gb.validation.OptionDefinition#getStructure
 * @return {Object} 검수 항목 정의 구조
 */
gb.validation.OptionDefinition.prototype.getStructure = function() {
	return this.structure;
};
/**
 * 검수 항목 정의 구조가 비어있는지 확인한다.
 * 
 * @method gb.validation.OptionDefinition#isEmpty
 * @return {boolean} 구조가 비어있는지 여부
 */
gb.validation.OptionDefinition.prototype.isEmpty = function() {
	var strc = this.getStructure();
	var isEmpty = false;
	var def = strc["definition"];
	if (Array.isArray(def)) {
		if (def.length === 0) {
			isEmpty = true;
		}
	}
	return isEmpty;
};
/**
 * 검수 항목 정의 파일을 다운로드한다.
 * 
 * @method gb.validation.OptionDefinition#getJSONFile
 */
gb.validation.OptionDefinition.prototype.getJSONFile = function() {
	var isEmpty = this.isEmpty();
	if (isEmpty) {
		this.setMessagePopup("danger", this.translation.nodataoutput[this.locale]);
		return;
	}

	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';

	// Safari 3.0+ "[object HTMLElementConstructor]"
	var isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
		return p.toString() === "[object SafariRemoteNotification]";
	})(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

	// Internet Explorer 6-11
	var isIE = /* @cc_on!@ */false || !!document.documentMode;

	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;

	// Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;

	// Blink engine detection
	var isBlink = (isChrome || isOpera) && !!window.CSS;

	if (isIE) {
		download(JSON.stringify(this.getStructure()), "option_setting.json", "text/plain");
	} else {
		var setting = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.getStructure()));
		var anchor = $("<a>").attr({
			"href" : setting,
			"download" : "option_setting.json"
		});
		$(anchor)[0].click();
	}
};

/**
 * 삭제전 확인창을 표시한다.
 * 
 * @method gb.validation.OptionDefinition#deleteConfirmModal
 * @param {string}
 *            type - 삭제할 대상의 타입
 * @param {function}
 *            callback - 삭제 버튼 클릭 후 수행할 콜백함수
 */
gb.validation.OptionDefinition.prototype.deleteConfirmModal = function(type, callback) {
	var msg1 = $("<div>").addClass("gb-optiondefinition-msg16");
	var title;
	if (type === "code") {
		$(msg1).text(this.translation.askDelCode[this.locale]);
		title = this.translation.delLayerModalTitle[this.locale];
	} else if (type === "attr") {
		$(msg1).text(this.translation.askDelAttr[this.locale]);
		title = this.translation.delOptModalTitle[this.locale];
	} else if (type === "reset") {
		$(msg1).text(this.translation.askReset[this.locale]);
		title = this.translation.resetOptTitle[this.locale];
	}
	var body = $("<div>").append(msg1);
	var closeBtn = $("<button>").addClass("gb-button-float-right").addClass("gb-button").addClass("gb-button-default").text(this.translation.cancel[this.locale]);
	var okBtn = $("<button>").addClass("gb-button-float-right").addClass("gb-button").addClass("gb-button-primary").text(this.translation.delete[this.locale]);
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);
	var deleteModal = new gb.modal.ModalBase({
		"title" : title,
		"width" : 310,
		"autoOpen" : false,
		"body" : body,
		"footer" : buttonArea
	});
	$(closeBtn).click(function() {
		deleteModal.close();
	});
	$(okBtn).click(function() {
		if (typeof callback === "function") {
			callback();
		}
		deleteModal.close();
	});
	deleteModal.open();
};
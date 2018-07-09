package com.gitrnd.qaproducer.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.gitrnd.qaproducer.domain.User;
import com.gitrnd.qaproducer.security.LoginUser;
import com.gitrnd.qaproducer.service.UserService;

@Controller
@RequestMapping(value = "/user")
public class UserController {

	@Autowired
	UserService userService;

	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@RequestMapping(value = "/userinfo.do")
	@ResponseBody
	public ModelAndView userInfoView(HttpServletRequest request, @AuthenticationPrincipal LoginUser loginUser)
			throws Exception {
		ModelAndView mav = new ModelAndView();
		if (loginUser != null) {
			LOGGER.info("access: /userinfo.do user={}", loginUser.getUsername());
			mav.addObject("username", loginUser.getUsername());
			mav.addObject("fname", loginUser.getFname());
			mav.addObject("lname", loginUser.getLname());
			mav.addObject("email", loginUser.getEmail());
			mav.addObject("auth", loginUser.getAuthorities());
		}
		String header = request.getHeader("User-Agent");
		if (header != null) {
			if (header.indexOf("Trident") > -1) {
				mav.addObject("browser", "MSIE");
			}
		}
		mav.setViewName("/user/userinfo");
		return mav;
	}

	@RequestMapping(value = "/idcheck.ajax")
	@ResponseBody
	public boolean checkDuplicatedID(HttpServletRequest request) throws Exception {
		boolean isUnique = false;
		String id = request.getParameter("id");
		User oldUser = userService.checkDuplicatedById(id);
		if (oldUser == null) {
			isUnique = true;
		}
		LOGGER.info("아이디 중복확인:{}", id);
		LOGGER.info("유일 아이디 여부:{}", isUnique);
		return isUnique;
	}

	@RequestMapping(value = "/emailcheck.ajax")
	@ResponseBody
	public boolean checkDuplicatedEmail(HttpServletRequest request) throws Exception {
		boolean isUnique = false;
		String email = request.getParameter("email");
		User oldUser = userService.checkDuplicatedByEmail(email);
		if (oldUser == null) {
			isUnique = true;
		}
		LOGGER.info("이메일 중복확인:{}", email);
		LOGGER.info("유일 아이디 여부:{}", isUnique);
		return isUnique;
	}

	@RequestMapping(value = "/deactivateuser.ajax")
	@ResponseBody
	public boolean deactivateUser(HttpServletRequest request, @AuthenticationPrincipal LoginUser loginUser)
			throws Exception {
		LOGGER.info("유저 비활성화 user=:{}", loginUser.getUsername());
		boolean isDeactivated = false;
		User user = new User();
		user.setUid(loginUser.getUsername());
		user.setActive(false);
		isDeactivated = userService.setActiveUserById(user);
		return isDeactivated;
	}
}

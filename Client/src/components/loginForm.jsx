import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../api";

function LoginForm({ active, setActive, onClickOutside, setUserLogged, setRegisterActive, userName }) {
	const visible =
		"col-9 col-sm-7 col-md-5 col-lg-3 p-2 login-form bg-dark position-absolute top-50 start-50 translate-middle rounded border border-light";
	const invisible = "login-form-invisible form-control w-25 bg-dark position-absolute";
	const formRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (active && !formRef.current.contains(e.target)) {
				onClickOutside();
				emailRef.current.value = "";
				passwordRef.current.value = "";
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [onClickOutside, active]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const email = formData.get("email");
		const password = formData.get("password");
		if (!email || !password) {
			toast.error("Please enter your account info", {
				style: { background: "#212529", color: "white", border: "1px solid gray" },
			});
		} else {
			await handleLogin(email, password);
		}
	};

	const handleLogin = async (userEmail, userPassword) => {
		try {
			const loginData = await loginUser(userEmail, userPassword);
			const userId = loginData.data.userId;
			const user = loginData.data.userName;
			if (loginData.data) {
				sessionStorage.setItem("userId", userId);
				userName(user);
				setUserLogged(true);
				setActive(false);
				sessionStorage.setItem("logged", true);
				sessionStorage.setItem("user", user);
				sessionStorage.setItem("userId", userId);
				toast.success(`Logged in successfully!\n Hi ${user}!`, {
					style: { background: "#212529", color: "white", border: "1px solid gray" },
				});
				emailRef.current.value = "";
				passwordRef.current.value = "";
			} else {
				toast.error("user not found", { style: { background: "#212529", color: "white", border: "1px solid gray" } });
			}
		} catch (error) {
			console.error("Error:", error);
			const errorMessage =
				error.response.status === 400 || error.response.status === 401 ? error.response.data : "Network error. Please try again.";
			toast.error(errorMessage, { style: { background: "#212529", color: "white", border: "1px solid gray" } });
		}
	};

	function registerLink(e) {
		e.preventDefault();
		setActive(false);
		setRegisterActive(true);
	}

	return (
		<div className="row">
			<form className={active ? visible : invisible} ref={formRef} onSubmit={handleSubmit}>
				<div className="row w-100 m-auto mb-2">
					<label className="text-white ps-1" htmlFor="login-email-input">
						Email Address
					</label>
					<input className="form-control" name="email" type="text" id="login-email-input" placeholder="Email" ref={emailRef} />
				</div>
				<div className="row w-100 m-auto mb-2">
					<label className="text-white ps-1" htmlFor="login-password-input">
						Password
					</label>
					<input
						className="form-control"
						name="password"
						type="password"
						id="login-password-input"
						placeholder="Enter Password"
						ref={passwordRef}
					/>
				</div>
				<div className="row w-100 m-auto justify-content-center">
					<button type="submit" className="btn btn-secondary w-50 bg-primary">
						Log In
					</button>
				</div>
				<div className="row w-100 m-auto justify-content-center text-white">
					<p className=" col-12">Demo account:</p>
					<p className=" col-12">Email: usuario@email.com</p>
					<p className=" col-12">Password: 123456</p>
				</div>
				<p className="text-white text-center m-0 p-1">
					Don't have an account? Register here
					<Link
						className="text-decoration-none ms-1"
						onClick={(e) => {
							registerLink(e);
						}}>
						Register
					</Link>
				</p>
			</form>
		</div>
	);
}

export default LoginForm;

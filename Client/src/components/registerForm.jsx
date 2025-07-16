import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function RegisterForm({ registerActive, setRegisterActive, onClickOutside, setActive }) {
	const visible =
		"col-9 col-sm-7 col-md-5 col-lg-3 p-2 login-form bg-dark position-absolute top-50 start-50 translate-middle rounded border border-light";
	const invisible = "register-form-invisible form-control w-25 bg-dark position-absolute";
	const ref = useRef(null);
	const registerNameInput = useRef(null);
	const registerEmailInput = useRef(null);
	const registerPasswordInput = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (registerActive && !ref.current.contains(e.target)) {
				onClickOutside();
				registerNameInput.current.value = "";
				registerEmailInput.current.value = "";
				registerPasswordInput.current.value = "";
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [registerActive, onClickOutside]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const name = formData.get("name");
		const email = formData.get("email");
		const password = formData.get("password");
		if (!name | !email || !password) {
			toast.error("Please enter your account info", {
				style: { background: "#212529", color: "white", border: "1px solid gray" },
			});
		} else {
			await handleRegister(name, email, password);
		}
	};

	const handleRegister = async (userName, userEmail, userPassword) => {
		try {
			const registerData = await axios.post("https://gamingdb-react.onrender.com/user", {
				userName: userName,
				userEmail: userEmail,
				userPassword: userPassword,
			});
			if (registerData.status === 200) {
				setRegisterActive(false);
				toast.success("registered successfully!", {
					style: { background: "#212529", color: "white", border: "1px solid gray" },
				});
				registerNameInput.current.value = "";
				registerEmailInput.current.value = "";
				registerPasswordInput.current.value = "";
			} else {
				toast.error("Error, try again", {
					style: { background: "#212529", color: "white", border: "1px solid gray" },
				});
			}
		} catch (error) {
			console.error("Error:", error);
			const errorMessage = error.response ? error.response.data : "Network error. Please try again.";
			toast.error(errorMessage, { style: { background: "#212529", color: "white", border: "1px solid gray" } });
		}
	};

	function loginLink(e) {
		e.preventDefault();
		setRegisterActive(false);
		setActive(true);
	}

	return (
		<form className={registerActive ? visible : invisible} ref={ref} onSubmit={handleSubmit}>
			<div className="row w-100 m-auto mb-2">
				<label className="text-white ps-1" htmlFor="register-name-input">
					User Name
				</label>
				<input
					className="form-control"
					name="name"
					type="text"
					id="register-name-input"
					ref={registerNameInput}
					placeholder="Name"
				/>
			</div>

			<div className="row w-100 m-auto mb-2">
				<label className="text-white ps-1" htmlFor="register-email-input">
					Email Address
				</label>
				<input
					className="form-control"
					name="email"
					type="text"
					id="register-email-input"
					ref={registerEmailInput}
					placeholder="Email"
				/>
			</div>

			<div className="row w-100 m-auto mb-2">
				<label className="text-white ps-1" htmlFor="register-password-input">
					Password
				</label>
				<input
					className="form-control"
					name="password"
					type="text"
					id="register-password-input"
					placeholder="Enter Password"
					ref={registerPasswordInput}
				/>
			</div>

			<div className="row w-100 m-auto justify-content-center">
				<button className="btn btn-secondary w-50 bg-primary" type="submit">
					Register
				</button>
			</div>

			<p className="text-white text-center m-0 p-1">
				Already have an account? Log in here{" "}
				<Link
					className="text-decoration-none"
					onClick={(e) => {
						loginLink(e);
					}}>
					Log in
				</Link>
			</p>
		</form>
	);
}

export default RegisterForm;

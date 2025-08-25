import React,{useState} from "react";
import Login from "./Login";
import Register from "./Register";
import Survey from "./Survey";
function AccessTab() {
	const [activeTab, setActiveTab] = useState<"register" | "login">("register");
	const [message, setMessage] = useState("");
	const [token, setToken] = useState<string | null>(null);

	if (token) {
		return <Survey />;
	}
	return (
	<div className="flex flex-col min-h-screen items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%)' }}>
			<div className="max-w-md w-full p-2 mx-auto">
				<h1 className="text-3xl font-extrabold text-center mb-8 text-white tracking-wide drop-shadow-lg">Welcome to the Survey Application</h1>
				<div className="flex mb-6 shadow-lg rounded-lg overflow-hidden border border-purple-300 bg-white">
					<button
						className={`flex-1 py-3 px-4 font-semibold transition-colors duration-200 text-lg tracking-wide focus:outline-none ${activeTab === "register" ? "bg-purple-800 text-white shadow-inner" : "bg-purple-100 text-purple-800 hover:bg-purple-200"}`}
						onClick={() => setActiveTab("register")}
					>
						Register
					</button>
					<button
						className={`flex-1 py-3 px-4 font-semibold transition-colors duration-200 text-lg tracking-wide focus:outline-none ${activeTab === "login" ? "bg-purple-800 text-white shadow-inner" : "bg-purple-100 text-purple-800 hover:bg-purple-200"}`}
						onClick={() => setActiveTab("login")}
					>
						Login
					</button>
				</div>
				<div>
					{activeTab === "register" ? (
						<Register onSuccess={() => setActiveTab("login")} />
					) : (
						<Login onSuccess={setToken} />
					)}
				</div>
			</div>
		</div>
	);
}


export default AccessTab;
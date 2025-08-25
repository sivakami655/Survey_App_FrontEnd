import React from "react";

interface LoginProps {
    onSuccess?: (token: string) => void;
}

function Login({ onSuccess }: LoginProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            setMessage("Email is required.");
            return;
        }
        if (!password) {
            setMessage("Password is required.");
            return;
        }
        try {
            // Import login from api if not already
            const res = await import("../api/api").then(m => m.login(email, password));
            if (res.token) {
                alert("Login successful");
                setMessage("Login successful");
                setEmail("");
                setPassword("");
                localStorage.setItem('token', res.token); // Save token for Survey
                if (onSuccess) onSuccess(res.token);
            } else {
                setMessage(res.error || "Login failed");
            }
        } catch (error: any) {
            setMessage(error.message || "Login failed");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full border rounded px-3 py-2"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full border rounded px-3 py-2"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                {message && <div className="text-red-600 font-medium">{message}</div>}
                <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded font-semibold">Login</button>
            </form>
        </div>
    );
}


export default Login;
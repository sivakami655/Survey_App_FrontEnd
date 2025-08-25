import React from "react";
import { register } from "../api/api";
interface RegisterProps {
    onSuccess?: () => void;
}

function Register({ onSuccess }: RegisterProps) {
    // Validation function
        const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [message, setMessage] = React.useState("");

    const validate = async () => {
        if (!firstName.trim()) {
            setMessage("First name is required.");
            return false;
        }
        if (!email.trim()) {
            setMessage("Email is required.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage("Invalid email address.");
            return false;
        }
        // Password: min 8 chars, 1 number, 1 lowercase, 1 uppercase, 1 special char
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!password) {
            setMessage("Password is required.");
            return false;
        }
        if (!passwordRegex.test(password)) {
            setMessage("Password must be at least 8 characters, include 1 number, 1 lowercase, 1 uppercase, and 1 special character.");
            return false;
        }
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return false;
        }
        try {
            const res = await register(firstName, lastName, email, password);
            alert("Registration Successful");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setMessage("");
            if (onSuccess) onSuccess();
            return true;
        } catch (error: any) {
            setMessage(error.message || "Registration failed");
            return false;
        }
    };

    // Example submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (await validate()) {
            // Proceed with registration logic
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit}>
                {message && <div className="text-red-600 font-medium">{message}</div>}
                <div>
                    <label className="block mb-1 font-medium">First Name</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Last Name</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
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
                <div>
                    <label className="block mb-1 font-medium">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full border rounded px-3 py-2"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded font-semibold">Register</button>
            </form>
        </div>
    );
}


export default Register;
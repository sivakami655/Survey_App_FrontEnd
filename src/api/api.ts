
const API_URL = "http://localhost:5000/api";

// function for register
export async function register(firstName: string, lastName: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
        })
    });
    if (res.ok) {
        return await res.json();
    } else {
        const error = await res.json();
        throw new Error(error.error || 'Registration failed');
    }
}


// function for login
export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });
    if (res.ok) {
        return await res.json();
    } else {
        const error = await res.json();
        throw new Error(error.error || 'Login failed');
    }
}
// function for getQuestions
export async function getQuestions(token: string) {
    const res = await fetch(`${API_URL}/survey/questions`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (res.ok) {
        return await res.json();
    } else {
        const error = await res.json();
        throw new Error(error.error || 'Failed to fetch questions');
    }
}

// function for submitResponse
export async function submitResponse(token: string, questionId: number, value: string) {
    const res = await fetch(`${API_URL}/survey/response`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ questionId, value })
    });
    if (res.ok) {
        return await res.json();
    } else {
        const error = await res.json();
        throw new Error(error.error || 'Failed to submit response');
    }
}
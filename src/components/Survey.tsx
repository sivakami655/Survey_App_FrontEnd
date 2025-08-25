

import React, { useState, useEffect } from "react";

export interface Option {
    id: number;
    value: string;
    questionId?: number;
}

export interface Question {
    id: number;
    title: string;
    description: string;
    isRequired: boolean;
    inputType: string;
    options: Option[];
}

export interface Answer {
    questionId: number;
    value: string;
}

export interface Question {
    id: number;
    title: string;
    description: string;
    isRequired: boolean;
    inputType: string;
    options: Option[];
}

export interface Answer {
    questionId: number;
    value: string;
}

function Survey() {
    const token = localStorage.getItem('token') || '';
    const [completed, setCompleted] = useState(false);
    const [viewResponse, setViewResponse] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [questionError, setQuestionError] = useState("");
    // No need for responses state, we'll use answers

    const currentQuestion = questions[currentIndex];

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            setMessage("");
            try {
                const { data } = await import("../api/api").then(m => m.getQuestions(token));
                setQuestions(data || []);
            } catch (error: any) {
                setMessage(error.message || "Failed to load questions");
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [token]);

    // Validation for required questions
    const isAnswered = (q: Question) => {
        const ans = answers.find(a => a.questionId === q.id);
        if (!q.isRequired) return true;
        if (!ans || !ans.value || ans.value.trim() === "") return false;
        return true;
    };

    // Submit all answers when finished
    const handleFinish = async () => {
        // Check all required questions are answered
        const missing = questions.filter(q => q.isRequired && !isAnswered(q));
        if (missing.length > 0) {
            setMessage("Please answer all required questions before submitting.");
            return;
        }
        setLoading(true);
        setMessage("");
        try {
            const api = await import("../api/api");
            for (const ans of answers) {
                await api.submitResponse(token, ans.questionId, ans.value);
            }
            setCompleted(true);
        } catch (error: any) {
            setMessage(error.message || "Failed to submit responses");
        } finally {
            setLoading(false);
        }
    };

    // Show locally saved answers
    const handleViewResponses = () => {
        setViewResponse(true);
    };

    // Calculate progress percentage
    const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-500 flex-col">
            {/* Progress Bar outside the card */}
            {questions.length > 0 && !completed && (
                <div className="w-full max-w-md h-3 bg-white rounded mb-6 mt-8 mx-auto border border-purple-900">
                    <div
                        className="h-3 bg-purple-700 rounded transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Survey</h2>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : message ? (
                    <div className="text-red-600 text-center mb-2">{message}</div>
                ) : completed ? (
                    <>
                        <div className="text-green-700 text-center font-bold mb-4">Survey completed! Thank you for your responses.</div>
                        {!viewResponse && (
                            <button
                                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded w-full mb-4 transition-colors duration-200"
                                onClick={handleViewResponses}
                            >
                                View Responses
                            </button>
                        )}
                        {viewResponse && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Your Responses</h3>
                                {answers.length === 0 ? (
                                    <div>No responses found.</div>
                                ) : (
                                    <ul className="space-y-2">
                                        {answers.map((resp, idx) => {
                                            const q = questions.find(q => q.id === resp.questionId);
                                            return (
                                                <li key={idx} className="border rounded p-2">
                                                    <div><span className="font-semibold">Q:</span> {q ? q.title : resp.questionId}</div>
                                                    <div><span className="font-semibold">A:</span> {resp.value}</div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        )}
                    </>
                ) : questions.length > 0 && currentQuestion ? (
                    <>
                        <div className="mb-2 text-sm text-gray-500 text-center">
                            Question {currentIndex + 1} of {questions.length}
                        </div>
                        <div className="mb-4">
                            {questionError && (
                                <div className="text-red-600 text-center mb-2 font-semibold">This question is required</div>
                            )}
                            <div className="font-semibold mb-1">{currentQuestion.title}</div>
                            <div className="text-gray-600 mb-2 text-sm">{currentQuestion.description}</div>
                            {/* Render options or text input */}
                            {currentQuestion.inputType === "text" && (
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    value={answers.find(a => a.questionId === currentQuestion.id)?.value || ""}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setAnswers(prev => {
                                            const rest = prev.filter(a => a.questionId !== currentQuestion.id);
                                            return [...rest, { questionId: currentQuestion.id, value: val }];
                                        });
                                    }}
                                />
                            )}
                            {currentQuestion.inputType === "single-choice" && (
                                <div className="space-y-2">
                                    {(currentQuestion.options || []).map(opt => (
                                        <label key={opt.id} className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name={`question-${currentQuestion.id}`}
                                                value={opt.value}
                                                checked={answers.find(a => a.questionId === currentQuestion.id)?.value === opt.value}
                                                onChange={() => {
                                                    setAnswers(prev => {
                                                        const rest = prev.filter(a => a.questionId !== currentQuestion.id);
                                                        return [...rest, { questionId: currentQuestion.id, value: opt.value }];
                                                    });
                                                }}
                                            />
                                            <span>{opt.value}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                            {currentQuestion.inputType === "multi-choice" && (
                                <div className="space-y-2">
                                    {(currentQuestion.options || []).map(opt => {
                                        const selected = answers.find(a => a.questionId === currentQuestion.id)?.value?.split(",") || [];
                                        return (
                                            <label key={opt.id} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    value={opt.value}
                                                    checked={selected.includes(opt.value)}
                                                    onChange={e => {
                                                        let newSelected = [...selected];
                                                        if (e.target.checked) {
                                                            newSelected.push(opt.value);
                                                        } else {
                                                            newSelected = newSelected.filter(v => v !== opt.value);
                                                        }
                                                        setAnswers(prev => {
                                                            const rest = prev.filter(a => a.questionId !== currentQuestion.id);
                                                            return [...rest, { questionId: currentQuestion.id, value: newSelected.join(",") }];
                                                        });
                                                    }}
                                                />
                                                <span>{opt.value}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded disabled:opacity-50 transition-colors duration-200"
                                onClick={() => setCurrentIndex(idx => Math.max(0, idx - 1))}
                                disabled={currentIndex === 0}
                            >
                                Previous
                            </button>
                            {currentIndex < questions.length - 1 ? (
                                <button
                                    className="bg-purple-700 text-white px-4 py-2 rounded"
                                    onClick={() => {
                                        // Validate required before next
                                        if (questions[currentIndex].isRequired && !isAnswered(questions[currentIndex])) {
                                            setQuestionError("This question is required.");
                                            return;
                                        }
                                        setQuestionError("");
                                        setCurrentIndex(idx => Math.min(questions.length - 1, idx + 1));
                                    }}
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                    onClick={handleFinish}
                                >
                                    Finish
                                </button>
                            )}
                        {/* Error now shown at top of question */}
                        </div>
                    </>
                ) : (
                    <div className="text-center">No questions available.</div>
                )}
            </div>
        </div>
    );
}

export default Survey;

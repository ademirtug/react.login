import React, { useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useTranslation } from 'react-i18next';
import './Login.css';

export default function SplitLogin({ image }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    const { t } = useTranslation('login');
    const backgroundImage = image || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

    const redirectTo = searchParams.get("redirect") || "";

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await login(email, password, rememberMe);
        setIsLoading(false);
        if (result) navigate(redirectTo, { replace: true });
        else setError(t('invalidCredentials'));
    };

    return (
        <div className="login-container">
            <div
                className="login-left"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="overlay" />
                <div className="content">
                    <h2>{t('welcomeBack')}</h2>
                    <p>{t('loginAccess')}</p>
                </div>
            </div>

            <div className="login-right">
                <div className="login-form-container">
                    <h2>{t('signIn')}</h2>
                    <p>{t('enterDetails')}</p>

                    {error && <div className="login-error">{error}</div>}

                    <form className="login-form" onSubmit={handleLogin}>
                        <label>{t('email')}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('emailPlaceholder')}
                            required
                        />

                        <label>{t('password')}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t('passwordPlaceholder')}
                            required
                        />

                        <div className="login-remember">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                {t('rememberMe')}
                            </label>
                            <a href="#">{t('forgotPassword')}</a>
                        </div>

                        <button className="login-button" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="login-spinner"></span>
                                    {t('signingIn')}
                                </>
                            ) : (
                                t('signInButton')
                            )}
                        </button>
                    </form>

                    {/* Uncomment if you want social login */}
                    {/* <div className="login-social">
                        <p>{t('orSignInWith')}</p>
                        <div className="login-social-icons">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('google')}
                                aria-label="Sign in with Google"
                            >
                                <i className="fab fa-google"></i>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('github')}
                                aria-label="Sign in with GitHub"
                            >
                                <i className="fab fa-github"></i>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('microsoft')}
                                aria-label="Sign in with Microsoft"
                            >
                                <i className="fab fa-microsoft"></i>
                            </button>
                        </div>
                    </div> */}

                    {/* Uncomment if you want sign up link */}
                    {/* <p className="login-signup">
                        {t('noAccount')} <a href="#">{t('signUp')}</a>
                    </p> */}
                </div>
            </div>
        </div>
    );
}
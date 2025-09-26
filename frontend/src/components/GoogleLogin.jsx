import React, { useState } from 'react'

const GoogleLogin = ({ onSuccess, onError, userType = 'user' }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        
        try {
            // For now, we'll simulate Google login since we need to install Google OAuth library
            // In a real implementation, you would use @google-cloud/oauth2 or similar
            
            const mockGoogleUser = {
                id: '123456789',
                email: 'user@gmail.com',
                name: 'Google User',
                picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                verified: true
            }

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500))

            if (onSuccess) {
                onSuccess(mockGoogleUser)
            }
        } catch (error) {
            console.error('Google login error:', error)
            if (onError) {
                onError(error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-3"></div>
                    <span className="text-gray-600">Signing in...</span>
                </div>
            ) : (
                <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-gray-700 font-medium">
                        Continue with Google
                    </span>
                </div>
            )}
        </button>
    )
}

export default GoogleLogin

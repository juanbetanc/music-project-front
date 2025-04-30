'use client'

import { useLoginMutation } from '@/features/auth/authApi'
import { loginSchema } from '@/schemas/auth/login'
import { saveToken } from '@/utils/auth'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { jwtDecode } from 'jwt-decode'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/hooks/hooks'
import { setAuth } from '@/features/user/userSlice'

type LoginFormData = z.infer<typeof loginSchema>

const Login = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [login, { isLoading, error }] = useLoginMutation()

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await login(data).unwrap()
            saveToken(response.access_token)

            const decoded = jwtDecode<{
                id: string
                email: string
                role: string
            }>(response.access_token)

            dispatch(setAuth(decoded))
            router.push('/home')
        } catch (err) {
            console.error('Login failed:', err)
        }
    }

    return (
        <div className="min-h-screen bg-white flex justify-center items-center px-4 py-8 overflow-hidden">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6 animate-fade-in">Login</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-600 transform transition duration-300 group-hover:translate-x-1">Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-600 transform transition duration-300 group-hover:translate-x-1">Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 transform transition-all duration-200 hover:scale-105 active:scale-95" disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </span>
                            ) : (
                                'Login'
                            )}
                        </Button>

                        {error && (
                            <p className="text-sm text-red-400 text-center animate-pulse">
                                {(error as any)?.data?.message || 'Login failed'}
                            </p>
                        )}
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login

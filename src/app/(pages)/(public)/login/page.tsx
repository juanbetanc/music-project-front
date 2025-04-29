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
        <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4 py-8">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">Login</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
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
                                    <FormLabel className="text-gray-300">Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>

                        {error && (
                            <p className="text-sm text-red-500 text-center">
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

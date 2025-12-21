
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLocation, useNavigate } from "react-router"
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"

const Verify = () => {

    const inputsRef = useRef([])
    const [otp, setOtp] = useState(Array(6).fill(""))
    const [loading, setLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [sendOtp] = useSendOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    const location = useLocation()
    const [email] = useState(location.state)
    console.log(email)
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!email) {
    //         navigate('/')
    //     }
    // }, [email])

    useEffect(() => {
        if (otpSent && inputsRef.current[0]) {
            inputsRef.current[0].focus()
        }
    }, [otpSent])

    const handleChange = (e: any, index: any) => {
        const value = e.target.value
        if (!/^[0-9]?$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e: any, index: any) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus()
        }
    }

    const handleSendOtp = async () => {
        const toastId = toast.loading("Sending Otp")
        try {
            setOtpSent(true)
            const res = await sendOtp({ email: email }).unwrap()
            console.log(res)
            if (res.success) {
                toast.success("Otp sent", { id: toastId })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit =async (e: any) => {
        try {

            e.preventDefault()

            const otpCode = otp.join("")
            if (otpCode.length !== 6) {
                alert("Please enter the complete OTP")
                return
            }

            setLoading(true)
            console.log("OTP Submitted:", otpCode)
            const res = await verifyOtp({ email: email , otp:otpCode}).unwrap()

            if (res.success) {
                toast.success("Successfully verified")
            }

            navigate('/login')

            setTimeout(() => {
                setLoading(false)
            }, 1000)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Verify your email</CardTitle>
                    <CardDescription>
                        We’ll send a verification code to your email
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {!otpSent ? (
                        <Button
                            className="w-full"
                            onClick={handleSendOtp}
                        >
                            Send OTP
                        </Button>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* OTP Inputs */}
                            <div className="mb-6 mt-2 flex justify-center gap-3">
                                {otp.map((_, index) => (
                                    <Input
                                        key={index}
                                        ref={(el) => (inputsRef.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={otp[index]}
                                        className="h-12 w-12 text-center text-lg font-semibold"
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                    />
                                ))}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? "Verifying..." : "Verify"}
                            </Button>

                            <p className="mt-4 text-center text-sm text-muted-foreground">
                                Didn’t receive the code?{" "}
                                <button
                                    type="button"
                                    className="text-primary underline"
                                    onClick={handleSendOtp}
                                >
                                    Resend
                                </button>
                            </p>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default Verify

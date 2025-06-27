import { Separator } from "@/components/ui/separator"
import { enabledProviders } from "@/lib/auth/auth-options";
import { FaGoogle, FaTwitter } from 'react-icons/fa'
import { Button } from "./ui/button";

const OtherSignIn = () => {

    if(enabledProviders.includes("credentials") && enabledProviders.length === 1) return null

    return (
        <>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {enabledProviders.includes('google') &&
                <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-200">
                    <FaGoogle/>
                    Google
                </Button>}
                {enabledProviders.includes("Twitter") &&
                <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-200">
                    <FaTwitter/>
                    Twitter
                </Button>}
            </div>
        </>
    )
}

export default OtherSignIn
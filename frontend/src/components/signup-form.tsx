import { cn } from "@/lib/utils"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">

              {/*header-logo*/}
              <div className="flex flex-col items-center text-center gap-2">
                <a 
                  href="/"
                  className="mx-auto block w-fit text-center"
                >
                  <img src="/logo.svg" alt="logo" />
                </a>
                <h1 className="text-2xl font-bold">Tạo tài khoản HuNi</h1>
                <p className="text-muted-foreground text-balance">Chào mừng bạn đến với HuNi, hãy đăng kí để bắt đầu</p>
              </div>

              {/*họ và tên*/}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="block text-sm">Họ</Label>
                  <Input type="text" id="lastname" />    
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstname" className="block text-sm">Tên</Label>
                  <Input type="text" id="firstname" />
                </div>
              </div>

              {/*username*/}
              <div className="flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm">Tên đăng nhập</Label>
                <Input type="text" id="username" placeholder="HuNi"/>
              </div>

              {/*email*/}
              <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="block text-sm">Email</Label>
                <Input type="email" id="email" />
              </div>

              {/*pass*/}
              <div className="flex flex-col gap-3">
                <Label htmlFor="password" className="block text-sm">Mật khẩu </Label>
                <Input type="password" id="password"/>
              </div>

              {/*nút đăng kí*/}
              
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="px-6 text-center">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a>{" "}
        và <a href="#">Chính sách bảo mật </a> của chúng tôi
      </div>
    </div>
  )
}

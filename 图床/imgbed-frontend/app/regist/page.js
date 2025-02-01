'use client'
import { Alert, Button, Card, CardBody, CardFooter, CardHeader,Input,Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react"
import {regist} from "@/api/index"
import { useState } from "react"
import {EyeSlashFilledIcon,EyeFilledIcon} from "@/components/icons"
import { useRouter } from "next/navigation"

const Page=()=>{
    const [userid,setUserid]=useState('')
    const [password,setPassword]=useState('')
    const [nickname,setNickname]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [alertMsg,setAlertMsg]=useState('')
    const [showAlert,setShowAlert]=useState(false)
    const [alertMsg1,setAlertMsg1]=useState('')
    const [showAlert1,setShowAlert1]=useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [showD,setShowD]=useState(false)
    const router=useRouter()
    const submit=async()=>{
        var js=await regist(userid,password,nickname,phone,email)
        if(js.code==200){
            setShowD(true)
        }else{
            setShowAlert1(true)
            setAlertMsg1(js.msg)
        }
    }

    const handleRetry=(value)=>{
        console.log('pwd:'+password.toString())
        console.log('retry:'+value)
        if(value!=password){
            setShowAlert(true)
            setAlertMsg('两次密码不一致，请重新输入')
        }else{
            setShowAlert(false)
        }
    }

    const handleSu=()=>{
        setShowD(!showD)
        router.push('/')
    }

    return(
        <div className="w-full flex grid justify-items-center">
            <Card className="w-1/3">
                <CardHeader>注册用户</CardHeader>
                <CardBody className="grid gap-5">
                    <Input label="账号" placeholder="Enter your userid" onValueChange={setUserid} />
                    <Input label="昵称" placeholder="Enter your nickNae" onValueChange={setNickname} />
                    <Input label="密码" placeholder="Enter your Password" onValueChange={setPassword} endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
           
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      variant="bordered" />
                    <Input label="再次输入密码" type="password" placeholder="retry your Password" onChange={(e)=>handleRetry(e.target.value)}/>
                    {showAlert && (<Alert color="danger" title={alertMsg} />)}
                    <Input label="邮箱" placeholder="Enter your email" onValueChange={setEmail} />
                    <Input label="手机" placeholder="Enter your phone number" onValueChange={setPhone}/>
                    {showAlert1 && (<Alert color="danger" title={alertMsg1} />)}
                </CardBody>
                <CardFooter>
                    <Button onPress={submit}>注册</Button>
                </CardFooter>
            </Card>
            <Modal isOpen={showD} backdrop="blur" hideCloseButton>
                <ModalContent>
                    <ModalHeader className="">系统提示</ModalHeader>
                    <ModalBody>
                        <span>注册成功</span>
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={handleSu}>确定</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Page
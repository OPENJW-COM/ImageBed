'use client'
import { Input,Button,
    Card,CardBody,CardHeader,CardFooter,
    Modal,ModalBody,ModalContent,ModalHeader,ModalFooter,
Alert} from "@heroui/react"
import { useEffect, useState } from "react"
import {EyeSlashFilledIcon,EyeFilledIcon} from "@/components/icons"
import {login} from "@/api/index"
import { useRouter } from "next/navigation"

export const Login=({status,onfunc})=>{
    const [ss,setSs]=useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [userid,setUserid]=useState('')
    const [pwd,setPwd]=useState('')
    const [s,setS]=useState(false)
    const [msg,setMsg]=useState('')
    const route=useRouter()


    const handelLogin=async()=>{
        if(userid.length==0 || pwd.length==0){
            setS(true)
            setMsg('用户名密码需要输入')
            return
        }
        var js= await login(userid,pwd)
        console.log(js)
        if(js.code==200){
            localStorage.setItem('token',js.data)
            localStorage.setItem('nickname',js.nickname)
            localStorage.setItem('userid',userid)
            window.location.href="/"
        }else{
            setS(true)
            setMsg('登录失败')
        }

    }
    const handelReg=()=>{
        onfunc()
        route.push('/regist')
    }
    return(
        <>
        <Modal backdrop="blur" isOpen={status} onClose={onfunc}>           
            <ModalContent>
                <ModalHeader>登录</ModalHeader>
                <ModalBody>
                    <Card>
                        <CardBody>
                            <div className="grid gap-2">
                                <Input label="账号" placeholder="Enter your userid" type="text"
                                className="max-w-xs"
                                value={userid}
                                onValueChange={setUserid}
                                 ></Input>
                                <Input
      className="max-w-xs"
      endContent={
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
      value={pwd}
      onValueChange={setPwd}
      label="Password"
      placeholder="Enter your password"
      type={isVisible ? "text" : "password"}
      variant="bordered"
    />
                            </div>
                        </CardBody>
                        <CardFooter className="flex gap-5">
                            <Button onPress={handelLogin}>登录</Button>
                            <Button onPress={handelReg}>注册</Button>
                        </CardFooter>
                    </Card>
                    {s && (<div ><Alert color="danger" isVisible="true" title={msg} onClose={()=>{setS(!s)}} /></div>)}
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}
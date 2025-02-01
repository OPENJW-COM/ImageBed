'use client'
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import {Alert, Button, Input,Card,CardBody,CardHeader,CardFooter,Image} from "@heroui/react"
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { addimg,getlist } from "@/api/index";
export default function Home() {
  const [content,setContent]=useState([])
  const [showAlert,setShowAlert]=useState(false)
  const [msg,setMsg]=useState('')
  const [filepath,setFilepath]=useState('')
  const [formData,setFormData]=useState({
    token:'',
    userid:'',
    image:null
  })
  const handleUpload=async()=>{    
    const form=new FormData()
    form.append('token',formData.token)
    form.append('userid',formData.userid)
    form.append('files',formData.image)
    var js=await addimg(form)
    if(js.code==200){
      setFilepath(js.data)
      await getdata()
    }else{
      console.log(js.msg)
      setShowAlert(true)
      setMsg(js.msg)
    }
  }
  const getdata=async()=>{
    var js=await getlist('')
    if(js.code==200){
      setContent(js.data)
    }
    
  }
  useEffect(()=>{
    var token=  window.localStorage.getItem("token")
    var userid=window.localStorage.getItem("userid")
    setFormData((formData)=>({...formData,token,userid}))
    getdata()
  },[])
  const handleGoLank=(value)=>{
    window.open(value, '_blank');
    
  }
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: "cyan" })}>{process.env.NEXT_PUBLIC_WEBTITLE}&nbsp;</span>
        <br />
        <span className={subtitle()}>
        为你提供极速图片托管服务，无论是个人博客、网站开发，还是社交平台，都能轻松上传、管理和分享你的图片。无限空间、无广告干扰，让你专注创作。
        </span>       
      </div>

      <div className="flex gap-3">
       
      </div>

      <div className="mt-3 flex gap-5">

           <Input  type="file"  onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                                accept="image/jpeg,image/png"
                                required
                                variant="bordered" />
  <Button onPress={handleUpload}>上传</Button>
      </div>
      <div className="flex grid gap-5">
        {filepath??(
          <>
           <span> url:{filepaths}</span>
          </>
        )}
        {showAlert&&(<Alert color="danger" title={msg} onClose={()=>setShowAlert(!showAlert)} />)}
      </div>
    <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
        {content.map(item=>{
          return(
            <Card isFooterBlurred className="h-[300px] col-span-8 sm:col-span-4">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">OPENJW.COM</p>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              src={item.imgpath}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-end">
              <div className="flex justify-center">               
                <a className="bg-blue-400 p-2 pt-1 pb-1 rounded-full text-white" target="_blank" href={item.imgpath}>view</a>
              </div>
            </CardFooter>
          </Card>
          )
        })}
    </div>
    </section>
  );
}

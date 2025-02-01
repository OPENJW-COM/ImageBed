'use client'
import {Card, CardHeader, CardBody, Image, Link} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Info(){
  const [token,setToken]=useState('')
  useEffect(()=>{
    setToken(window.localStorage.getItem('token'))
  },[])
    var route=useRouter()
    const handleShutdown=()=>{
        window.localStorage.clear();
        route.push("/")
    }
    return(
        <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">API Token:</p>
          <small className="text-default-500">{token}</small>
          <h4 className="font-bold text-large">token为私人秘钥，请勿泄露造成个人安全隐患</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Link onPress={handleShutdown}>
            注销
          </Link>
        </CardBody>
      </Card>
    )
}
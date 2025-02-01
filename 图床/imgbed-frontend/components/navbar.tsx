'use client'
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link, LinkIcon } from "@heroui/link";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import clsx from "clsx";
import { Login } from "./Dialog";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const Navbar = ({title}:{title:string|undefined}) => {
  const [userid,setUserid]=useState<string | null>(null)
  const [token,setToken]=useState<string | null>(null)
  const [nickName,setNickName]=useState<string | null>(null)
  const [js,setJs]=useState(false)
  const route=useRouter()
  useEffect(()=>{
      setUserid(localStorage.getItem('userid'))
      setToken(localStorage.getItem('token'))
      setNickName(localStorage.getItem('nickname'))
  },[])
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
  const handleLogin=()=>{
    setJs(!js)
  }
  const handleClose=()=>{
    setJs(!js)
  }
  const handleGoInfo=()=>{
    route.push('/info')
  }
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">{title}</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
         
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >       
        <NavbarItem className="">
          <Link href={process.env.NEXT_PUBLIC_BASEURL+'swagger'}>
          API
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          {nickName==null?
          <Button className="text-sm font-normal text-default-600 bg-default-100" onPress={handleLogin} >
          登录</Button>
          :
           <Button
           isExternal
           as={Link}
           className="text-sm font-normal text-default-600 bg-default-100"
           
           startContent={<HeartFilledIcon className="text-danger" />}
           onPress={handleGoInfo}
           variant="flat"
         >
           {nickName}
         </Button>}         
        </NavbarItem>
      </NavbarContent>

     

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
         
        </div>
      </NavbarMenu>    
      <Login status={js} onfunc={handleClose} /> 
    </HeroUINavbar>
    
  );
};

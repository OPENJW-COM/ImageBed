import {GET,POST,FormPost} from '@/api/fetch'

/*
*login
*return json: code 200 success other failed,msg output message
*/
export const login=async(userid,pass)=>{
    var data={}
    data['userid']=userid
    data['pass']=pass
    var js=await POST('api/login/login',data)
    return js
}
/*
*regiest
*return json: code 200 success other failed,msg output message
*/
export const regist=async(userid,password,nickname,phone,mail)=>{
    var data={}
    data['userid']=userid
    data['password']=password
    data['nickname']=nickname
    data['phone']=phone
    data['mail']=mail
    var js=await POST('api/login/regist',data)
    return js
}
/*
*getdata
*return json: code 200 success other failed,data output array
*data item:
*imgpath,filename,createtime
*/
export const getlist=async(keyword)=>{
    var token=''
    token=window.localStorage.getItem('token')
    var js=await GET('api/login/getImg?token='+token+'&keyword='+keyword)
    return js
}
/*
*addImage
*param data:image file,formbody 
*return json: code 200 success other failed,msg output message
*/
export const addimg=async(data)=>{
    var js=await FormPost('api/login/addimg',data)
    return js
}
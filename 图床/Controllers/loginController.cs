using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System.Data;

namespace 图床.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class loginController : ControllerBase
    {
        [HttpPost]
        [ApiExplorerSettings(IgnoreApi =true)]
        public JsonResult login([FromBody] object? a)
        {
            Dictionary<string, string> key = new Dictionary<string, string>();
            key = JsonConvert.DeserializeObject<Dictionary<string, string>>(a.ToString());
            key.TryGetValue("userid", out string userid);
            key.TryGetValue("pass", out string pass);
            string pwd = utils.convertMd5(pass);
            string token = dbhelp.checklogin(userid, pwd,out string nickname);
            if (string.IsNullOrEmpty(token))
            {
                return new JsonResult(new { code = 500, msg = "登录失败" });
            }
            return new JsonResult(new { code = 200, msg = "登录成功",data=token,nickname=nickname });
        }
        [HttpPost]
        [ApiExplorerSettings(IgnoreApi = true)]
        public JsonResult regist([FromBody] object a)
        {
            Dictionary<string, string> key = new Dictionary<string, string>();
            key = JsonConvert.DeserializeObject<Dictionary<string, string>>(a.ToString());
            key.TryGetValue("userid", out string userid);
            key.TryGetValue("password", out string password);
            key.TryGetValue("nickname", out string nickname);
            key.TryGetValue("phone", out string phone);
            key.TryGetValue("mail", out string mail);
            if(string.IsNullOrEmpty(userid) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(nickname) || string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(mail))
            {
                return new JsonResult(new { code = 500, msg = "必填项目需要填写" });
            }
            int row = dbhelp.regist(userid, password, nickname, phone, mail,out string m);
            if(row==0) 
                return new JsonResult(new { code = 500, msg = m });
            return new JsonResult(new { code = 200, msg = "注册成功" });
        }
        /// <summary>
        /// 获取图床列表
        /// </summary>
        /// <param name="token"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        [HttpGet]
        [ApiExplorerSettings(IgnoreApi = true)]
        public JsonResult getImg(string? token,string? keyword)
        {
            DataTable dt = new DataTable();
            dt = dbhelp.getImgList(token, keyword);
            return new JsonResult(new { code = 200, data = dt });
        }
        /// <summary>
        /// 上传图片
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult addImg([FromForm] object a )
        {
            var form= Request.ReadFormAsync();
            form.Result.TryGetValue("token", out StringValues tokens);
            form.Result.TryGetValue("userid", out StringValues userids);
            var token = tokens.FirstOrDefault();
            var userid = userids.FirstOrDefault();
            if (string.IsNullOrEmpty(token) || token.Equals("null"))
                return new JsonResult(new { code = 500, msg = "请登录后再上传" });
            var file = Request.Form.Files;
            if(file.Count!=1)
                return new JsonResult(new { code = 500, msg = "需要上传一张图片" });
            var type= file[0].ContentType;    
            if(type!= "image/jpeg" && type != "image/png" && type != "image/gif" && type != "image/bmp" && type != "image/x-icon" && type != "image/tiff" && type != "image/svg+xml" && type != "image/webp")
            {
                return new JsonResult(new { code = 500, msg = "不支持的格式" });
            }
            var filename = file[0].FileName;
            var fileExtend = Path.GetExtension(file[0].FileName);
            var filepath =Path.Combine(AppContext.BaseDirectory + "files",tokens.FirstOrDefault());
            var newfilename = Guid.NewGuid().ToString() + fileExtend;
            var finalPath = dbParam.url + "/files/" + tokens.FirstOrDefault() + "/" + newfilename;
            var overpath = Path.Combine(filepath, newfilename);
            if (!Directory.Exists(filepath))
            {
                Directory.CreateDirectory(filepath);
            }
            using(var stream=new FileStream(overpath, FileMode.Create, FileAccess.Write))
            {
                file[0].CopyTo(stream);
            }
            dbhelp.addimg(tokens.FirstOrDefault(), finalPath,userids.FirstOrDefault(),filename);
            return new JsonResult(new { code = 200, data =dbParam.url+"\\files\\"+ tokens.FirstOrDefault()+"\\"+newfilename });
            
        }
    }
}

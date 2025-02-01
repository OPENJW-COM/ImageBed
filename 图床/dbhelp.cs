using MySql.Data.MySqlClient;
using System.Data;

namespace 图床
{
    public static class dbhelp
    {
        internal static void addimg(string token, string overpath,string userid,string filename)
        {
            using (MySqlConnection con = new MySqlConnection(dbParam.conn))
            {
                con.Open();
                var sql = $"insert into imghistory(userid,token,imgpath,filename,createtime)" +
                    $" values('{userid}','{token}','{overpath}','{filename}','{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}')";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.ExecuteNonQuery();
            }
        }

        internal static string checklogin(string? userid, string pass,out string nickname)
        {
            string token = string.Empty;
            nickname = string.Empty;
            using (MySqlConnection con = new MySqlConnection(dbParam.conn))
            {
                con.Open();
                var sql = $"select token,nickname from user where userid='{userid}' and pass='{pass}'";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                MySqlDataReader dr = cmd.ExecuteReader();
                if(dr.Read() && dr.HasRows)
                {
                    token = dr.GetString("token");
                    nickname = dr.GetString("nickname");
                }
                dr.Close();
            }
            return token;
        }

        internal static DataTable getImgList(string token, string keyword)
        {
            DataTable dt = new DataTable();
            var userid = string.Empty;
            string where = string.Empty;
            if (!string.IsNullOrEmpty(keyword))
            {
                where += $" and filename like '%{keyword}%'";
            }
            using(MySqlConnection con=new MySqlConnection(dbParam.conn))
            {
                con.Open();
                var sql = $"select userid from user where token='{token}'";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                using(MySqlDataReader dr = cmd.ExecuteReader())
                {
                    if(dr.Read() && dr.HasRows)
                    {
                        userid = dr.GetString("userid");
                    }
                }
                if (string.IsNullOrEmpty(userid))
                    return dt;
                sql = $"select imgpath,filename,createtime from imghistory where userid='{userid}' {where} order by createtime desc";
                MySqlDataAdapter da = new MySqlDataAdapter(sql, con);
                DataSet ds = new DataSet();
                da.Fill(ds);
                dt = ds.Tables[0];                
            }
            return dt;
        }

        internal static int regist(string userid, string password, string nickname, string phone, string mail,out string msg)
        {
            string entpwd = utils.convertMd5(password);
            string now = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            string token = utils.convertMd5(userid + now);
            int row = 0;
            msg=string.Empty;
            try
            {
                using (MySqlConnection con = new MySqlConnection(dbParam.conn))
                {
                    con.Open();
                    var sql = $"insert into user(userid,pass,nickname,phone,mail,token,createtime) " +
                        $"values('{userid}','{entpwd}','{nickname}','{phone}','{mail}','{token}','{now}')";
                    MySqlCommand cmd = new MySqlCommand(sql, con);
                    row = cmd.ExecuteNonQuery();
                }
            }
            catch(Exception ex)
            {
                if(ex.Equals("Duplicate entry"))
                {
                    msg = "用户已存在";
                }
                else
                {
                    msg = ex.Message;
                }
            }
           
          
            return row;
        }
    }
}

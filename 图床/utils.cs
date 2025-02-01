using System.Security.Cryptography;
using System.Text;

namespace 图床
{
    public static class utils
    {
        public static string convertMd5(string value)
        {
            string entry = string.Empty;
            var a=MD5.Create();
            byte[] vs = Encoding.UTF8.GetBytes(value);
            var hash = a.ComputeHash(vs);
            foreach(byte b in hash)
            {
                entry += b.ToString("X2");
            }
            return entry;
        }
    }
}

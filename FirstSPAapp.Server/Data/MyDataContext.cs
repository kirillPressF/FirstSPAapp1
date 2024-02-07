using FirstSPAapp.Server.Models;

namespace FirstSPAapp.Server.Data
{
    public class MyDataContext
    {
        public List<PostModel> Posts { get; set; }

        public MyDataContext()
        {
            Posts = new List<PostModel>();
        }
    }
}

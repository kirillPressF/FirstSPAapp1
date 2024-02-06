using FirstSPAapp.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FirstSPAapp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        [HttpPost]
        public object Create(PostModel model)
        {

        }
        [HttpPatch]
        public object Update(PostModel model)
        {

        }
        [HttpGet("{id}")]
        public object Get(int id)
        {

        }
        [HttpGet]
        public object GetAll()
        {

        }
        [HttpDelete("{id}")]
        public object Delete(int id)
        {

        }
    }
}

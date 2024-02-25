using System.Web.Http.Cors;
using FirstSPAapp.Server.Models;
using FirstSPAapp.Server.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FirstSPAapp.Server.Controllers
{
    [Route("api/FileApi/uploadData")]
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private IPostsService _postsService;
        public PostsController(IPostsService postsService)
        {
            _postsService = postsService;
        }
        [HttpPost]
        public PostModel Create(PostModel model)
        {
            return _postsService.Create(model);
        }
        [HttpPatch]
        public PostModel Update(PostModel model)
        {
            return _postsService.Update(model);
        }
        [HttpGet("{id}")]
        public PostModel Get(int id)
        {
            return _postsService.Get(id);
        }
        [HttpGet]
        public IEnumerable<PostModel> GetAll()
        {
            return _postsService.Get();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        { 
            _postsService.Delete(id);
            return Ok();
        }
    }
}

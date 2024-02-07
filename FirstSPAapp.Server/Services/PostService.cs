using FirstSPAapp.Server.Data;
using FirstSPAapp.Server.Models;
using FirstSPAapp.Server.Services.Interfaces;

namespace FirstSPAapp.Server.Services
{
    public class PostService : IPostService
    {
        private MyDataContext _dataContext; 
        public PostService(MyDataContext context)
        {
            this._dataContext = context;
        }
        public PostModel Create(PostModel model)
        {
            var last = _dataContext.Posts.LastOrDefault();
            int newId = last == null ? 1 : last.Id + 1;
            model.Id = newId;
            _dataContext.Posts.Add(model);
            return model;
        }

        public PostModel Update(PostModel model)
        {
            var modelToUpdate = _dataContext.Posts.FirstOrDefault(x=>x.Id==model.Id);
            if (modelToUpdate != null)
            {
                modelToUpdate.Header = model.Header;
                modelToUpdate.Text = model.Text;
            }

            return modelToUpdate;
        }
        public void Delete(int id)
        {
            if (id >= 0 && _dataContext.Posts.Any(x => x.Id == id))
            {
                _dataContext.Posts.Remove(_dataContext.Posts.FirstOrDefault(x => x.Id == id));
            }
        }

        public PostModel Get(int id)
        {
            if (id >= 0 && _dataContext.Posts.Any(x => x.Id == id))
            {
                var modelToReturn = _dataContext.Posts.FirstOrDefault(x => x.Id == id);
            }

            return null;
        }

        public List<PostModel> Get() =>_dataContext.Posts;

    }
}

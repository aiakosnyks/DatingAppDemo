using API.DTOs;
using API.Entities;
using API.Helpers;
using Namespace;
using Newtonsoft.Json.Linq;

namespace API.Interfaces{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDTO>> GetMessagesForUser();
        Task<IEnumerable<MessageDTO>> GetMessageThread(int currentUserId, int recipientId);
        Task<bool> SaveAllAsync();
    }
}
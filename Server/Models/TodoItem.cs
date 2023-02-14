#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class TodoItem
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        public bool IsComplete { get; set; } = false;
    }
}
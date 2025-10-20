using DNDMapDalton.Models;

namespace DNDMapDalton.Services;

public class MapStateService
{
    public List<Player> Players { get; private set; } = new();
    public List<Shop> Shops { get; private set; } = new();

    public event Action? OnChange;

    public void AddPlayer(Player player)
    {
        Players.Add(player);
        NotifyStateChanged();
    }

    public void UpdatePlayer(Player player)
    {
        var existingPlayer = Players.FirstOrDefault(p => p.Id == player.Id);
        if (existingPlayer != null)
        {
            existingPlayer.Name = player.Name;
            existingPlayer.ImageUrl = player.ImageUrl;
            existingPlayer.X = player.X;
            existingPlayer.Y = player.Y;
            NotifyStateChanged();
        }
    }

    public void InitializeShops()
    {
        // Add some example shops - you can modify these
        Shops = new List<Shop>
        {
            new Shop { Name = "The Mystic Scroll", Description = "Magical scrolls and books", X = 100, Y = 100 },
            new Shop { Name = "Blacksmith's Forge", Description = "Weapons and armor", X = 200, Y = 150 },
            new Shop { Name = "Potion Emporium", Description = "Various magical potions", X = 150, Y = 250 },
            // Add more shops as needed
        };
        NotifyStateChanged();
    }

    private void NotifyStateChanged() => OnChange?.Invoke();
}
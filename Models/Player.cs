namespace DNDMapDalton.Models;

public class Player
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public double X { get; set; }
    public double Y { get; set; }
    public int Size { get; set; } = 40; // Default token size in pixels
}
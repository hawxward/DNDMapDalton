# DNDMapDalton

A D&D map application built with Blazor WebAssembly that allows you to display a map image and move player tokens around with zoom capabilities.

## Features

- **Interactive Map Display**: Display custom map images as backgrounds
- **Draggable Player Tokens**: Move player markers around the map with drag-and-drop
- **Customizable Tokens**:
  - Set player names
  - Add custom images or use default letter avatars
  - Adjust token size (20-120 pixels)
- **Zoom Controls**: Zoom in/out from 50% to 300%
- **Shop/POI Markers**: Add points of interest to the map
- **Responsive Design**: Works on desktop and mobile devices

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to "Pages" in the left sidebar
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"

2. **Automatic Deployment**:
   - The workflow will automatically run when you push to the `master` or `main` branch
   - Check the "Actions" tab to monitor deployment progress
   - Once complete, your app will be available at: `https://hawxward.github.io/DNDMapDalton/`

3. **Manual Deployment**:
   - Go to the "Actions" tab
   - Select "Deploy Blazor WASM to GitHub Pages"
   - Click "Run workflow"

## Local Development

### Prerequisites
- .NET 8.0 SDK or later

### Running Locally
```bash
dotnet restore
dotnet run
```

The app will be available at `https://localhost:5001` or `http://localhost:5000`

### Building for Production
```bash
dotnet publish -c Release
```

## Project Structure

- `Pages/Map.razor` - Main map component with drag-drop and zoom functionality
- `Models/Player.cs` - Player token data model
- `Models/Shop.cs` - Shop/POI data model
- `Services/MapStateService.cs` - State management service
- `wwwroot/` - Static assets (CSS, JavaScript, images)
  - `wwwroot/images/World_MapGFloor.png` - Map background image
  - `wwwroot/js/map.js` - JavaScript for zoom and drag positioning
  - `wwwroot/css/map.css` - Map-specific styling

## Adding Custom Maps

1. Place your map image in `wwwroot/images/`
2. Update the CSS in `wwwroot/css/map.css`:
   ```css
   .map {
       background-image: url('../images/your-map-name.png');
   }
   ```
3. Commit and push to trigger automatic deployment

## Technologies Used

- **Blazor WebAssembly** - Frontend framework
- **C# / .NET 8.0** - Programming language and runtime
- **Bootstrap** - UI styling
- **JavaScript Interop** - For advanced DOM manipulation
- **GitHub Actions** - CI/CD deployment

## License

This project is open source and available under the MIT License.

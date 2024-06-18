using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;


namespace DemoApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
[EnableCors("CorsPolicy")]
public class DemoController : ControllerBase
{
    [HttpGet(Name = "Demo")]
    public async Task<ActionResult> Get()
    {
        JObject json = JObject.Parse(System.IO.File.ReadAllText(@"..\testdata.json"));
        return Ok($"{json.ToString()}");
    }
}
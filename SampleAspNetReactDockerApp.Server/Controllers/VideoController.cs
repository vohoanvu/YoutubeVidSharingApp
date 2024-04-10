﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SampleAspNetReactDockerApp.Server.Data;
using SampleAspNetReactDockerApp.Server.Helpers;
using SampleAspNetReactDockerApp.Server.Models;
using System.Security.Claims;

namespace SampleAspNetReactDockerApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VideoController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IYoutubeDataService _youtubeDataService;
        private readonly ISharedVideoRepository _sharedVideoRepository;

        public VideoController(ILogger<WeatherForecastController> logger, 
            IYoutubeDataService youtubeDataService, ISharedVideoRepository sharedVideoRepository)
        {
            _logger = logger;
            _youtubeDataService = youtubeDataService;
            _sharedVideoRepository = sharedVideoRepository;
        }

        [HttpPost("/metadata/{videoUrl}")]
        [Authorize]
        public async Task<ActionResult<VideoDetailsResponse>> GetVideoMetadata(string videoUrl)
        {
            var videoId = YouTubeHelper.ExtractVideoId(videoUrl);
            if (videoId == null)
            {
                return BadRequest($"No valid video Id was found from this url {videoUrl}. Please double-check the url or the regex pattern!");
            }

            var videoDetailsResponse = await _youtubeDataService.GetVideoDetailsAsync(videoId);
            if (videoDetailsResponse is null)
            {
                return NotFound(new { message=$"Video metadata was not found for this videoId {videoId}" });
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var video = new SharedVideo
            {
                VideoId = videoId,
                Title = videoDetailsResponse.Title,
                Description = videoDetailsResponse.Description,
                Url = videoUrl,
                DateShared = DateTime.Now,
                UserId = userId
            };

            await _sharedVideoRepository.SaveAsync(video);

            return videoDetailsResponse;
        }
    }
}

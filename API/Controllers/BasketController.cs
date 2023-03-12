using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{ 
    public class BasketController : BaseApiController
    {
        private readonly ILogger<BasketController> _logger;
        private readonly IBasketRepository _basketRepository;

        public BasketController(ILogger<BasketController> logger, IBasketRepository basketRepository)
        {
            _basketRepository = basketRepository;
            _logger = logger;
        }
        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id){
            var basket = await _basketRepository.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));
        } 

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket){
            var UpdateBasket = await _basketRepository.UpdateBasketAsync(basket);
            return Ok(UpdateBasket);
        }
        [HttpDelete]
        public async Task DeleteBasketAsync(string id){
            await _basketRepository.DeleteBasketAsync(id);
        }


    }
}
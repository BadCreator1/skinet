using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extentions
{
    public static class USerManagerExtensions
    {
        public static async Task<AppUser> FindByEmailWithAddressAsync(
            this UserManager<AppUser> input, ClaimsPrincipal user)
        {
            var email = user.FindFirst(ClaimTypes.Email).Value.ToString();

            return await input.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
        }

        public static async Task<AppUser> FindByEmailFromClaimsPrincipal(this UserManager<AppUser> input, ClaimsPrincipal user)
        {
            var email = user.FindFirst(ClaimTypes.Email).Value.ToString();

            return await input.Users.SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}
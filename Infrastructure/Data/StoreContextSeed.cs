using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerfactory)
        {
            try
            {
                if (!context.ProductBrand.Any())
                {
                    var brandsOfProducts = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsOfProducts);

                    foreach (var item in brands)
                    {
                        context.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if (!context.ProductType.Any())
                {
                    var typeOfProducts = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                    var type = JsonSerializer.Deserialize<List<ProductType>>(typeOfProducts);

                    foreach (var item in type)
                    {
                        context.Add(item);
                    }
                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var Products = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                    var products = JsonSerializer.Deserialize<List<Products>>(Products);

                    foreach (var item in products)
                    {
                        context.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                var logger = loggerfactory.CreateLogger<StoreContextSeed>();
                logger.LogError(e.Message);
            }
        }
    }
}
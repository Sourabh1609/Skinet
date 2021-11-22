using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Products>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParameters prodSpecParams)
        :base(x => 
            (string.IsNullOrEmpty(prodSpecParams.Search) || x.Name.ToLower().Contains(prodSpecParams.Search)) &&
            (!prodSpecParams.BrandId.HasValue || x.ProductBrandId == prodSpecParams.BrandId ) && 
            (!prodSpecParams.TypeId.HasValue || x.ProductTypeId == prodSpecParams.TypeId)
        )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);

            AddOrderBy(x => x.Name);
            ApplyPaging(prodSpecParams.PageSize*(prodSpecParams.PageIndex-1),prodSpecParams.PageSize);

            if (!string.IsNullOrEmpty(prodSpecParams.Sort))
            {
                switch (prodSpecParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDesc(p => p.Price);
                        break;


                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}
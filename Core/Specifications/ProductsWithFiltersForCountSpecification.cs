using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithFiltersForCountSpecification : BaseSpecification<Products>
    {
        public ProductsWithFiltersForCountSpecification(ProductSpecParameters prodSpecParams) :
        base(x =>
            (string.IsNullOrEmpty(prodSpecParams.Search) || x.Name.ToLower().Contains(prodSpecParams.Search)) &&
            (!prodSpecParams.BrandId.HasValue || x.ProductBrandId == prodSpecParams.BrandId) &&
            (!prodSpecParams.TypeId.HasValue || x.ProductTypeId == prodSpecParams.TypeId)
        )
        {

        }
    }
}
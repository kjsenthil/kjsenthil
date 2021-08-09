environment_prefix      = "prod"
location                = "UK South"
vnet_cidr               = "10.231.24.0/24"
api_management_sku_name = "Developer_1"
private_dns_zone        = ""
public_dns_zones = [
  {
    public_dns_parent_zone = "beta.bestinvest.co.uk"
    public_dns_child_zones = []
  }
]
dns_a_records = {}
sg_rules      = []

api_backends = {
  "bestinvest-identity-api" = {
    name                       = "bestinvest-identity-api"
    url                        = "https://identityapi.demo2.bestinvest.co.uk/api/"
    validate_certificate_chain = true
  },
  "bestinvest-myaccounts-api" = {
    name                       = "bestinvest-myaccounts-api"
    url                        = "https://myaccountsapi.demo2.bestinvest.co.uk/api/"
    validate_certificate_chain = true
  },
  "bestinvest-online-api" = {
    name                       = "bestinvest-online-api"
    url                        = "https://online.demo2.bestinvest.co.uk/api/"
    validate_certificate_chain = true
  },
  "bestinvest-oisapi-api" = {
    name                       = "bestinvest-oisapi-api"
    url                        = "https://identityapi.demo2.bestinvest.co.uk/api/"
    validate_certificate_chain = true
  },
  "xplan-api" = {
    name                       = "xplan-api"
    url                        = "https://tbigroupuat2.xplan.iress.co.uk/"
    validate_certificate_chain = true
  }
}

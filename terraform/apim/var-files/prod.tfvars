environment_prefix      = "prod"
location                = "UK South"
vnet_cidr               = "10.233.26.0/24"
api_management_sku_name = "Developer_1"
private_dns_zone        = ""
public_dns_zones = [
  {
  public_dns_parent_zone     = "beta.bestinvest.co.uk"
  public_dns_child_zones     = []
  }
]
dns_a_records           = []
sg_rules                = []
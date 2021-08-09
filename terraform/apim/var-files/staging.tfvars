environment_prefix      = "staging"
location                = "UK South"
vnet_cidr               = "10.233.25.0/24"
api_management_sku_name = "Developer_1"
private_dns_zone        = "uat3.bestinvest.co.uk"
public_dns_zones = [
  {
    public_dns_parent_zone = "bi-digital.co.uk"
    public_dns_child_zones = ["dev", "alpha"]
  }
]

dns_a_records = {
  "online" = {
    name    = "online"
    records = ["10.1.63.5"]

  },
  "myaccountsapi" = {
    name    = "myaccountsapi"
    records = ["10.1.63.5"]

  },
  "identityapi" = {
    name    = "identityapi"
    records = ["10.1.63.5"]

  },

  "oisapi" = {
    name    = "oisapi"
    records = ["10.1.63.5"]

  }
}

sg_rules = [
  {
    name                       = "Outbound-To-MyAccounts"
    description                = "Allows egress to MyAccounts"
    priority                   = 104
    direction                  = "Outbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_address_prefix      = "10.233.25.0/24" # same as vnet_cidr
    source_port_range          = "*"
    destination_address_prefix = "10.1.63.5/32"
    destination_port_range     = 443
  },
  {
    name                       = "Outbound-To-XplanUAT2"
    description                = "Allows egress to Xplan UAT2"
    priority                   = 105
    direction                  = "Outbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_address_prefix      = "10.233.25.0/24" # same as vnet_cidr
    source_port_range          = "*"
    destination_address_prefix = "103.3.199.215/32"
    destination_port_range     = 443
}]


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

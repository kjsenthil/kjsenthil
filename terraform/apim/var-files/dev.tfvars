environment_prefix      = "dev"
location                = "UK South"
vnet_cidr               = "10.233.24.0/24"
api_management_sku_name = "Developer_1"
private_dns_zone        = "test3.bestinvest.co.uk"
public_dns_zones        = []

dns_a_records = {
  "online" = {
    name    = "online"
    records = ["10.1.63.50"]

  },
  "myaccountsapi" = {
    name    = "myaccountsapi"
    records = ["10.1.63.50"]

  },
  "identityapi" = {
    name    = "identityapi"
    records = ["10.1.63.50"]

  },

  "oisapi" = {
    name    = "oisapi"
    records = ["10.1.63.50"]

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
    source_address_prefix      = "10.233.24.0/24" # same as vnet_cidr
    source_port_range          = "*"
    destination_address_prefix = "10.1.63.50/32"
    destination_port_range     = 443
  },
  {
    name                       = "Outbound-To-XplanUAT2"
    description                = "Allows egress to Xplan UAT2"
    priority                   = 105
    direction                  = "Outbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_address_prefix      = "10.233.24.0/24" # same as vnet_cidr
    source_port_range          = "*"
    destination_address_prefix = "103.3.199.215/32"
    destination_port_range     = 443
}]

api_backends = {
  "bestinvest-identity-api" = {
    name                       = "bestinvest-identity-api"
    url                        = "https://identityapi.test3.bestinvest.co.uk/api/"
    validate_certificate_chain = false
  },
  "bestinvest-myaccounts-api" = {
    name                       = "bestinvest-myaccounts-api"
    url                        = "https://myaccountsapi.test3.bestinvest.co.uk/api/"
    validate_certificate_chain = false
  },
  "bestinvest-online-api" = {
    name                       = "bestinvest-online-api"
    url                        = "https://online.test3.bestinvest.co.uk/api/"
    validate_certificate_chain = false
  },
  "bestinvest-oisapi-api" = {
    name                       = "bestinvest-oisapi-api"
    url                        = "https://oisapi.test3.bestinvest.co.uk/api/"
    validate_certificate_chain = false
  },
  "xplan-api" = {
    name                       = "xplan-api"
    url                        = "https://tbigroupuat2.xplan.iress.co.uk/"
    validate_certificate_chain = true
  }
}

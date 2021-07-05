environment_prefix      = "dev"
location                = "UK South"
vnet_cidr               = "10.233.24.0/24"
api_management_sku_name = "Developer_1"
private_dns_zone        = "test3.bestinvest.co.uk"
public_dns_zones        = []
dns_a_records           = ["10.1.63.50"]

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
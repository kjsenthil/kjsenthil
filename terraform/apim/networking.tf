resource "azurerm_virtual_network" "this" {
  name                = "vnet-${local.short_location}-${var.environment_prefix}-${var.app_name}"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location            = data.azurerm_resource_group.resource_group.location
  address_space       = [var.vnet_cidr]
}

resource "azurerm_subnet" "apim_external_subnet" {
  name                 = "snet-${local.short_location}-${var.environment_prefix}-${var.app_name}"
  resource_group_name  = data.azurerm_resource_group.resource_group.name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = [cidrsubnet(var.vnet_cidr, 5, 1)]
  service_endpoints    = ["Microsoft.Web"]
}

resource "azurerm_subnet_network_security_group_association" "apim_external_subnet" {
  network_security_group_id = azurerm_network_security_group.apim_security_group.id
  subnet_id                 = azurerm_subnet.apim_external_subnet.id
}

resource "azurerm_network_security_group" "apim_security_group" {
  name                = "sg-${local.short_location}-${var.environment_prefix}-${var.app_name}"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location            = data.azurerm_resource_group.resource_group.location

  // See following for info on security rule mapping
  // https://docs.microsoft.com/en-us/azure/api-management/api-management-using-with-vnet#-common-network-configuration-issues
  security_rule {
    name        = "Inbound-web"
    description = "Allows ingress to port 443 from the internet"

    direction = "Inbound"
    protocol  = "Tcp"
    access    = "Allow"
    priority  = 100

    source_address_prefix = "Internet"
    source_port_range     = "*"

    destination_address_prefix = "VirtualNetwork"
    destination_port_range     = "443"
  }

  security_rule {
    name        = "Inbound-API-Management"
    description = "Allows ingress to port 3443 from API Management"

    direction = "Inbound"
    protocol  = "Tcp"
    access    = "Allow"
    priority  = 101

    source_address_prefix = "ApiManagement"
    source_port_range     = "*"

    destination_address_prefix = "VirtualNetwork"
    destination_port_range     = "3443"
  }

  security_rule {
    name        = "Outbound-Azure-storage"
    description = "Allows egress on port 443 to Azure storage"

    direction = "Outbound"
    protocol  = "Tcp"
    access    = "Allow"
    priority  = 102

    source_address_prefix = "VirtualNetwork"
    source_port_range     = "*"

    destination_address_prefix = "Storage"
    destination_port_range     = "443"
  }

  security_rule {
    name        = "Outbound-App-Service"
    description = "Allows egress on port 443 to Azure Web Apps"

    direction = "Outbound"
    protocol  = "Tcp"
    access    = "Allow"
    priority  = 103

    source_address_prefix = "VirtualNetwork"
    source_port_range     = "*"

    destination_address_prefix = "AppService"
    destination_port_range     = "443"
  }

  tags = merge(local.default_tags, var.tags)
}

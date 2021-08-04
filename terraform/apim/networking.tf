resource "azurerm_virtual_network" "this" {
  name                = "vnet-${local.short_location}-${var.environment_prefix}-${var.app_name}"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location            = data.azurerm_resource_group.resource_group.location
  address_space       = [var.vnet_cidr]
  tags                = merge(local.default_tags, var.tags)
}

resource "azurerm_subnet" "apim_external_subnet" {
  name                 = "snet-${local.short_location}-${var.environment_prefix}-${var.app_name}"
  resource_group_name  = data.azurerm_resource_group.resource_group.name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = [cidrsubnet(var.vnet_cidr, 5, 1)]
  service_endpoints    = ["Microsoft.Web"]
}

resource "azurerm_subnet" "private_link_subnet" {
  name                                           = "snet-private-link-${local.short_location}-${var.environment_prefix}-${var.app_name}"
  resource_group_name                            = data.azurerm_resource_group.resource_group.name
  virtual_network_name                           = azurerm_virtual_network.this.name
  address_prefixes                               = [cidrsubnet(var.vnet_cidr, 5, 2)]
  enforce_private_link_endpoint_network_policies = true
}

resource "azurerm_network_security_group" "apim_security_group" {
  name                = "sg-${local.short_location}-${var.environment_prefix}-${var.app_name}"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location            = data.azurerm_resource_group.resource_group.location

  security_rule {
    name                       = "Inbound-web"
    description                = "Allows ingress to port 443 from the internet"
    direction                  = "Inbound"
    protocol                   = "Tcp"
    access                     = "Allow"
    priority                   = 100
    source_address_prefix      = "Internet"
    source_port_range          = "*"
    destination_address_prefix = "VirtualNetwork"
    destination_port_range     = "443"
  }

  security_rule {
    name                       = "Inbound-API-Management"
    description                = "Allows ingress to port 3443 from API Management"
    direction                  = "Inbound"
    protocol                   = "Tcp"
    access                     = "Allow"
    priority                   = 101
    source_address_prefix      = "ApiManagement"
    source_port_range          = "*"
    destination_address_prefix = "VirtualNetwork"
    destination_port_range     = "3443"
  }

  security_rule {
    name                       = "Outbound-Azure-storage"
    description                = "Allows egress on port 443 to Azure storage"
    direction                  = "Outbound"
    protocol                   = "Tcp"
    access                     = "Allow"
    priority                   = 102
    source_address_prefix      = "VirtualNetwork"
    source_port_range          = "*"
    destination_address_prefix = "Storage"
    destination_port_range     = "443"
  }

  security_rule {
    name                       = "Outbound-App-Service"
    description                = "Allows egress on port 443 to Azure Web Apps"
    direction                  = "Outbound"
    protocol                   = "Tcp"
    access                     = "Allow"
    priority                   = 103
    source_address_prefix      = "VirtualNetwork"
    source_port_range          = "*"
    destination_address_prefix = "AppService"
    destination_port_range     = "443"
  }

  # Used to provision environment specific sg rules.
  dynamic "security_rule" {
    for_each = var.sg_rules != [] ? var.sg_rules : []
    content {
      name                       = security_rule.value.name
      description                = security_rule.value.description
      priority                   = security_rule.value.priority
      direction                  = security_rule.value.direction
      access                     = security_rule.value.access
      protocol                   = security_rule.value.protocol
      source_address_prefix      = security_rule.value.source_address_prefix
      source_port_range          = security_rule.value.source_port_range
      destination_address_prefix = security_rule.value.destination_address_prefix
      destination_port_range     = security_rule.value.destination_port_range
    }
  }

  tags = merge(local.default_tags, var.tags)
}

resource "azurerm_subnet_network_security_group_association" "apim_external_subnet" {
  network_security_group_id = azurerm_network_security_group.apim_security_group.id
  subnet_id                 = azurerm_subnet.apim_external_subnet.id
}

resource "azurerm_route_table" "apim_external_route_table" {
  name                = "apim_external_route_table"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location            = data.azurerm_resource_group.resource_group.location

  route {
    name                   = "onpremiseroute"
    address_prefix         = "10.0.0.0/8"
    next_hop_type          = "VirtualAppliance"
    next_hop_in_ip_address = "10.231.0.182"
  }

  tags = merge(local.default_tags, var.tags)
}

resource "azurerm_subnet_route_table_association" "apim_external_subnet_rt" {
  subnet_id      = azurerm_subnet.apim_external_subnet.id
  route_table_id = azurerm_route_table.apim_external_route_table.id
}

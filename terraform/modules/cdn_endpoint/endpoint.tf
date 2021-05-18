resource "azurerm_cdn_endpoint" "storage_account" {
  name                = var.name
  resource_group_name = var.resource_group_name
  location            = "Global"
  profile_name        = var.cdn_profile_name
  origin_host_header  = var.origin_hostname
  is_http_allowed     = false
  origin {
    host_name = var.origin_hostname
    name      = var.origin_name
  }

  // Redirect all HTTP requests to HTTPS
  delivery_rule {
    name  = "BlockHttp"
    order = 1
    request_scheme_condition {
      operator     = "Equal"
      match_values = ["HTTP"]
    }
    url_redirect_action {
      redirect_type = "Found"
      protocol      = "Https"
    }
  }

  // Redirect all requests that aren't for a file to /index.html
  delivery_rule {
    name  = "RewriteSPARequests"
    order = 2
    url_file_extension_condition {
      operator     = "LessThan"
      match_values = ["1"]
    }
    url_rewrite_action {
      destination             = "/index.html"
      source_pattern          = "/"
      preserve_unmatched_path = false
    }
  }

  tags = var.tags
}

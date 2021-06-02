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

  // Globally add security headers to all outgoing responses
  global_delivery_rule {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
    modify_response_header_action {
      action = "Append"
      name   = "Strict-Transport-Security"
      value  = "max-age=31536000; includeSubDomains"
    }
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    modify_response_header_action {
      action = "Append"
      name   = "Content-Security-Policy"
      value  = "script-src ${var.csp_allowed_script_sources}; style-src ${var.csp_allowed_style_sources};"
    }
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
    modify_response_header_action {
      action = "Append"
      name   = "X-Frame-Options"
      value  = "SAMEORIGIN"
    }
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
    modify_response_header_action {
      action = "Append"
      name   = "X-Content-Type-Options"
      value  = "nosniff"
    }
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
    modify_response_header_action {
      action = "Append"
      name   = "Referrer-Policy"
      value  = "same-origin"
    }
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
    modify_response_header_action {
      action = "Append"
      name   = "Permissions-Policy"
      value  = "payment=(self), geolocation=(self)"
    }
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

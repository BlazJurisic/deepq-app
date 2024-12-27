from typing import Optional, List
from pydantic import BaseModel, Field, PositiveInt

class PasswordPolicy(BaseModel):
    """Password policy settings"""
    min_length: PositiveInt = Field(12, description="Minimum password length")
    require_special_chars: bool = Field(True, description="Require special characters")
    require_numbers: bool = Field(True, description="Require numbers")
    require_uppercase: bool = Field(True, description="Require uppercase letters")

class UserManagementConfig(BaseModel):
    """User management configuration"""
    allow_public_registration: bool = Field(True, description="Allow public user registration")
    require_email_verification: bool = Field(True, description="Require email verification")
    password_policy: PasswordPolicy = Field(default_factory=PasswordPolicy)
    default_user_role: str = Field("user", description="Default role for new users")
    auto_send_credentials: bool = Field(True, description="Automatically send credentials to new users")

class SecurityConfig(BaseModel):
    """Security configuration"""
    max_login_attempts: PositiveInt = Field(5, description="Maximum login attempts before lockout")
    session_timeout: PositiveInt = Field(30, description="Session timeout in minutes")
    ip_whitelist: List[str] = Field(default_factory=list, description="Whitelisted IP addresses")

class AdminSettings(BaseModel):
    """Admin settings schema"""
    user_management: UserManagementConfig = Field(default_factory=UserManagementConfig)
    security: SecurityConfig = Field(default_factory=SecurityConfig)

    class Config:
        from_attributes = True

# Base Settings schemas
class SettingsBase(BaseModel):
    """Base Settings Schema"""
    user_management: UserManagementConfig = Field(default_factory=UserManagementConfig)
    security: SecurityConfig = Field(default_factory=SecurityConfig)

class SettingsCreate(SettingsBase):
    """Schema for creating settings"""
    pass

class SettingsUpdate(BaseModel):
    """Schema for updating settings"""
    user_management: Optional[UserManagementConfig] = None
    security: Optional[SecurityConfig] = None

class SettingsInDBBase(SettingsBase):
    """Base DB Schema for Settings"""
    id: str

    class Config:
        from_attributes = True

class Settings(SettingsInDBBase):
    """Schema for returning settings"""
    pass

class SettingsInDB(SettingsInDBBase):
    """Schema for settings stored in DB"""
    pass

# Response schemas
class AdminSettingsResponse(BaseModel):
    """Response schema for admin settings"""
    success: bool = True
    message: str = "Settings updated successfully"
    settings: Optional[AdminSettings] = None

# Additional utility schemas
class EmailSettings(BaseModel):
    """Email configuration settings"""
    smtp_host: str
    smtp_port: int
    smtp_user: str
    smtp_password: str
    use_tls: bool = True
    from_email: str
    from_name: str

class IntegrationSettings(BaseModel):
    """Integration settings"""
    enabled_platforms: List[str] = Field(default_factory=list)
    api_rate_limit: int = Field(1000, description="API calls per hour")
    webhook_url: Optional[str] = None
    webhook_secret: Optional[str] = None

class AnalyticsSettings(BaseModel):
    """Analytics settings"""
    data_retention_days: PositiveInt = Field(90, description="Days to retain analytics data")
    enable_detailed_logging: bool = Field(True, description="Enable detailed analytics logging")
    sampling_rate: float = Field(1.0, description="Analytics sampling rate (0.0-1.0)")

class SystemSettings(BaseModel):
    """Complete system settings"""
    general: SettingsBase
    email: EmailSettings
    integrations: IntegrationSettings
    analytics: AnalyticsSettings

    class Config:
        from_attributes = True

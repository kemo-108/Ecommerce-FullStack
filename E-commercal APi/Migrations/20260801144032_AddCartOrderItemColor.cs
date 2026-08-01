using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_commercal_APi.Migrations
{
    /// <inheritdoc />
    public partial class AddCartOrderItemColor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ColorHexCode",
                table: "OrderItems",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ColorName",
                table: "OrderItems",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ColorHexCode",
                table: "CartItems",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ColorName",
                table: "CartItems",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ColorHexCode",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "ColorName",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "ColorHexCode",
                table: "CartItems");

            migrationBuilder.DropColumn(
                name: "ColorName",
                table: "CartItems");
        }
    }
}

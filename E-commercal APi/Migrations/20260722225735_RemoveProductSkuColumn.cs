using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_commercal_APi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveProductSkuColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sku",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Sku",
                table: "Products",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }
    }
}

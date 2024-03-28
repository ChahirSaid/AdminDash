"""empty message

Revision ID: 75016bd06479
Revises: 1d016a9bc0ae
Create Date: 2024-03-28 14:51:55.430990

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '75016bd06479'
down_revision = '1d016a9bc0ae'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('picture', sa.String(length=100), nullable=True))

    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.add_column(sa.Column('picture', sa.String(length=100), nullable=True))

    with op.batch_alter_table('team_member', schema=None) as batch_op:
        batch_op.add_column(sa.Column('picture', sa.String(length=100), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('team_member', schema=None) as batch_op:
        batch_op.drop_column('picture')

    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.drop_column('picture')

    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.drop_column('picture')

    # ### end Alembic commands ###